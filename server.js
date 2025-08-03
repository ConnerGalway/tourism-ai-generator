const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Content generation endpoint
app.post('/api/generate-content', async (req, res) => {
    try {
        const {
            businessType,
            contentType,
            location,
            season,
            target,
            tone,
            keywords
        } = req.body;

        // Validate required fields
        if (!businessType || !contentType || !location) {
            return res.status(400).json({
                error: 'Missing required fields: businessType, contentType, location'
            });
        }

        // Create the prompt based on content type
        const prompt = createPrompt({
            businessType,
            contentType,
            location,
            season,
            target,
            tone,
            keywords
        });

        // Generate content using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional tourism content writer specializing in creating compelling, engaging content for tourism businesses. Always write in the specified tone and format."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const generatedContent = completion.choices[0].message.content;

        // Generate variations and hashtags
        const variations = await generateVariations(businessType, location, season, target);
        const hashtags = await generateHashtags(businessType, location);

        res.json({
            main: generatedContent,
            variations: variations,
            hashtags: hashtags
        });

    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({
            error: 'Failed to generate content',
            details: error.message
        });
    }
});

function createPrompt(data) {
    const { businessType, contentType, location, season, target, tone, keywords } = data;
    
    const businessTypes = {
        hotel: 'hotel or resort',
        restaurant: 'restaurant',
        tour: 'tour operator or guide service',
        attraction: 'tourist attraction or activity',
        destination: 'destination marketing',
        rental: 'vacation rental property'
    };

    const contentTypes = {
        blog: 'blog post with headings and engaging content',
        social: 'social media post with emojis and hashtags',
        email: 'email campaign with subject line and body',
        ad: 'advertisement copy that is concise and compelling',
        description: 'business description for website or marketing materials',
        newsletter: 'newsletter content with engaging sections'
    };

    const tones = {
        friendly: 'friendly and welcoming',
        professional: 'professional and authoritative',
        exciting: 'exciting and energetic',
        luxury: 'luxury and sophisticated',
        casual: 'casual and relaxed',
        informative: 'informative and helpful'
    };

    return `Create a ${contentTypes[contentType]} for a ${businessTypes[businessType]} in ${location}.

Business Details:
- Location: ${location}
- Season: ${season || 'any season'}
- Target Audience: ${target || 'general travelers'}
- Tone: ${tones[tone] || 'friendly'}
- Key Features: ${keywords || 'amazing experiences and local charm'}

Requirements:
- Write in a ${tones[tone] || 'friendly'} tone
- Target audience: ${target || 'general travelers'}
- Include specific details about ${location}
- Make it engaging and compelling
- Use appropriate formatting for ${contentType}
- Include relevant hashtags if it's social media content
- Keep it authentic and local-focused

Please generate the content now:`;
}

async function generateVariations(businessType, location, season, target) {
    try {
        const prompt = `Generate 3 different variations of a short, compelling tagline for a ${businessType} in ${location}. 
        Target audience: ${target}. Season: ${season}. 
        Each variation should be 1-2 sentences maximum. Return only the variations, one per line.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a marketing expert who creates compelling taglines and variations."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 200,
            temperature: 0.8,
        });

        return completion.choices[0].message.content.split('\n').filter(line => line.trim());
    } catch (error) {
        console.error('Error generating variations:', error);
        return ['Experience the magic of ' + location, 'Discover ' + location + ' like never before', 'Your perfect getaway in ' + location];
    }
}

async function generateHashtags(businessType, location) {
    try {
        const businessHashtags = {
            hotel: ['#Travel', '#Vacation', '#Hotel', '#Getaway', '#Tourism'],
            restaurant: ['#LocalEats', '#FarmToTable', '#FreshFlavors', '#Dining', '#Foodie'],
            tour: ['#Adventure', '#Tours', '#Explore', '#LocalGuide', '#Sightseeing'],
            attraction: ['#FunForAll', '#LocalAttraction', '#MustSee', '#Experience', '#Adventure'],
            destination: ['#Travel', '#Destination', '#VisitLocal', '#Explore', '#Tourism'],
            rental: ['#VacationRental', '#LocalLiving', '#HomeAwayFromHome', '#Travel', '#StayLocal']
        };

        const baseHashtags = businessHashtags[businessType] || businessHashtags.hotel;
        const locationHashtag = '#' + location.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
        
        return [...baseHashtags, locationHashtag, '#VisitLocal', '#TravelMore'];
    } catch (error) {
        console.error('Error generating hashtags:', error);
        return ['#Travel', '#Tourism', '#VisitLocal'];
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Tourism AI Content Generator API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-content`);
});

module.exports = app; 