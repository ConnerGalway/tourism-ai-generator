const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files with correct MIME types
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Explicit routes for static files with correct MIME types
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/templates.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'templates.js'));
});

// Root route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Tourism AI Content Generator API is running' });
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Content generation endpoint
app.post('/api/generate-content', upload.single('image'), async (req, res) => {
    try {
        // Handle both JSON and multipart form data
        const formData = req.body;
        const uploadedImage = req.file;

        // Extract data from form
        const {
            businessType,
            contentType,
            location,
            season,
            target,
            tone,
            keywords
        } = formData;

        // Validate required fields
        if (!businessType || !contentType || !location) {
            return res.status(400).json({
                error: 'Missing required fields: businessType, contentType, location'
            });
        }

        // Create the prompt based on content type and image
        const prompt = createPrompt({
            businessType,
            contentType,
            location,
            season,
            target,
            tone,
            keywords,
            hasImage: !!uploadedImage,
            imageDescription: uploadedImage ? await analyzeImage(uploadedImage.path) : null
        });

        // Generate content using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional tourism content writer specializing in creating compelling, engaging content for tourism businesses. Always write in the specified tone and format. If an image is provided, incorporate visual details into the content."
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
        const variations = await generateVariations(businessType, location, season, target, uploadedImage);
        const hashtags = await generateHashtags(businessType, location);

        // Clean up uploaded file
        if (uploadedImage && fs.existsSync(uploadedImage.path)) {
            fs.unlinkSync(uploadedImage.path);
        }

        res.json({
            main: generatedContent,
            variations: variations,
            hashtags: hashtags
        });

    } catch (error) {
        console.error('Error generating content:', error);
        
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({
            error: 'Failed to generate content',
            details: error.message
        });
    }
});

function createPrompt(data) {
    const { businessType, contentType, location, season, target, tone, keywords, hasImage, imageDescription } = data;
    
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

    let prompt = `Create a ${contentTypes[contentType]} for a ${businessTypes[businessType]} in ${location}.

Business Details:
- Location: ${location}
- Season: ${season || 'any season'}
- Target Audience: ${target || 'general travelers'}
- Tone: ${tones[tone] || 'friendly'}
- Key Features: ${keywords || 'amazing experiences and local charm'}`;

    if (hasImage && imageDescription) {
        prompt += `\n\nImage Description: ${imageDescription}`;
    }

    prompt += `

Requirements:
- Write in a ${tones[tone] || 'friendly'} tone
- Target audience: ${target || 'general travelers'}
- Include specific details about ${location}
- Make it engaging and compelling
- Use appropriate formatting for ${contentType}
- Include relevant hashtags if it's social media content
- Keep it authentic and local-focused

Please generate the content now:`;

    return prompt;
}

async function analyzeImage(imagePath) {
    try {
        // Read the image file and convert to base64
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Describe this image in detail, focusing on its main subject, colors, and any notable details that would be relevant for tourism content."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error analyzing image:', error);
        return 'A beautiful image of the location.';
    }
}

async function generateVariations(businessType, location, season, target, uploadedImage) {
    try {
        let prompt = `Generate 3 different variations of a short, compelling tagline for a ${businessType} in ${location}. 
        Target audience: ${target}. Season: ${season}. 
        Each variation should be 1-2 sentences maximum. Return only the variations, one per line.`;

        if (uploadedImage) {
            const imageDescription = await analyzeImage(uploadedImage.path);
            prompt += `\n\nImage context: ${imageDescription}`;
        }

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

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-content`);
});

module.exports = app; 