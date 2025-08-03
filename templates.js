// Content Templates - Organized by content type and business type
const TEMPLATES = {
    blog: {
        hotel: `# Discover Paradise at {location}: Your Perfect {season} Getaway

When you're searching for the ideal {season} escape, {location} offers an unparalleled experience that combines natural beauty with exceptional hospitality. Our {businessType} provides the perfect base for your {target} adventure.

## Why Choose {location} This {season}?

{location} transforms into a magical destination during {season}, offering {keywords} that create unforgettable memories. Whether you're seeking relaxation or adventure, our location provides the ideal setting for your getaway.

## Exceptional Accommodations

Our carefully designed rooms and suites offer comfort and style, featuring:
- Stunning views of the surrounding landscape
- Modern amenities for today's traveler
- {keywords} that enhance your stay

## Local Experiences

Discover what makes {location} special:
- Seasonal activities perfect for {target}
- Local cuisine that showcases regional flavors
- Hidden gems only locals know about

Book your {season} getaway today and discover why {location} is the perfect destination for {target} seeking an extraordinary experience.`,

        restaurant: `# Savor the Flavors of {location}: A Culinary Journey This {season}

Located in the heart of {location}, our restaurant offers {target} an authentic taste of local cuisine with a {tone} atmosphere that captures the essence of {season}.

## Farm-to-Table Excellence

Our seasonal menu celebrates the best of {season} with locally-sourced ingredients and traditional cooking methods. Each dish tells the story of {location}'s rich culinary heritage.

## Perfect for {target}

Whether you're celebrating a special occasion or simply enjoying a meal out, our restaurant provides the ideal setting for {target}. Features include:
- {keywords}
- Seasonal specialties that highlight {season} flavors
- Warm, welcoming atmosphere

## Reserve Your Table

Experience the authentic flavors of {location} this {season}. Make your reservation today and discover why locals and visitors alike choose us for memorable dining experiences.`,

        tour: `# Explore {location} Like Never Before: {season} Adventures Await

Discover the hidden treasures of {location} with our expertly crafted tours designed specifically for {target}. This {season}, experience the magic of our destination through the eyes of local experts.

## Why Tour with Us?

Our {season} tours offer {target} the perfect blend of adventure and discovery, featuring {keywords} that showcase the best of {location}. From guided walks to immersive experiences, we bring the destination to life.

## What You'll Experience

- Expert local guides with deep knowledge of {location}
- {keywords} that highlight seasonal highlights
- Perfect pacing for {target}
- Insider access to hidden gems

## Book Your Adventure

Don't miss the opportunity to explore {location} this {season}. Our tours are designed with {target} in mind, ensuring an unforgettable experience that goes beyond the typical tourist path.`,

        attraction: `# Experience the Magic of {location}: {season} Adventures for {target}

Welcome to the most exciting attraction in {location}, where {season} brings new opportunities for adventure and discovery. Our attraction is perfectly designed for {target} seeking unforgettable experiences.

## What Makes Us Special

Our {season} programming features {keywords} that create the perfect environment for {target}. From thrilling activities to peaceful moments of reflection, we offer something for every type of visitor.

## Perfect for {target}

We've designed our experiences specifically with {target} in mind:
- Safe, engaging activities for all ages
- {keywords} that enhance the visitor experience
- Professional staff dedicated to your enjoyment

## Plan Your Visit

Make {location} your next destination this {season}. Our attraction provides the perfect setting for {target} to create lasting memories and discover the unique charm of our region.`,

        destination: `# Welcome to {location}: Your Perfect {season} Destination

Discover why {location} is becoming the premier destination for {target} seeking authentic experiences and unforgettable memories. This {season}, our region offers {keywords} that showcase the best of local culture and natural beauty.

## What Makes {location} Special

Our destination stands out for its unique combination of {keywords} that create the perfect environment for {target}. From cultural experiences to outdoor adventures, {location} has something for every type of traveler.

## Seasonal Highlights

This {season}, visitors can enjoy:
- Local festivals and events
- Seasonal activities perfect for {target}
- Authentic cultural experiences
- Natural beauty at its peak

## Plan Your Visit

Start planning your {season} getaway to {location} today. Our destination offers the perfect blend of adventure, relaxation, and cultural immersion for {target} seeking an extraordinary travel experience.`,

        rental: `# Your Perfect {season} Home Away From Home in {location}

Experience {location} like a local with our carefully curated vacation rentals, perfect for {target} seeking comfort, privacy, and authentic local experiences. This {season}, discover why our properties are the preferred choice for discerning travelers.

## Why Choose Our Rentals?

Our properties offer {target} the perfect combination of comfort and local charm, featuring {keywords} that enhance your stay. Each rental is thoughtfully designed to provide everything you need for an unforgettable {season} getaway.

## Perfect for {target}

Our rentals are specifically chosen and equipped for {target}:
- Spacious accommodations with all modern amenities
- {keywords} that create a home-like atmosphere
- Prime locations near local attractions
- Professional management and support

## Book Your Stay

Make {location} your home this {season}. Our vacation rentals provide the perfect base for {target} to explore, relax, and create lasting memories in one of the most beautiful destinations in the region.`
    },

    social: {
        hotel: `🏖️ Escape to paradise at {location}! ✨

This {season} is the perfect time for {target} to discover our slice of heaven. Featuring {keywords}, we're ready to make your getaway unforgettable.

Book now and experience {location} like never before! 

#TravelMore #VisitLocal`,

        restaurant: `🍽️ Taste the authentic flavors of {location}! 

Our {season} menu is now available, featuring fresh, local ingredients perfect for {target}. Come experience {keywords} in our welcoming atmosphere.

Reserve your table today! 👨‍🍳✨

#LocalEats #AuthenticFlavors`,

        tour: `🗺️ Discover {location} with expert local guides! 

This {season}, explore hidden gems and local secrets perfect for {target}. Experience {keywords} like never before.

Book your adventure today! 🚶‍♂️✨

#LocalTours #ExploreMore`,

        attraction: `🎢 Experience the thrill of {location}! 

This {season} brings new adventures for {target}. Discover {keywords} that will make your visit unforgettable.

Visit us today! 🎪✨

#LocalAttraction #FunForAll`,

        destination: `🌍 Welcome to {location}! 

This {season} is the perfect time for {target} to discover our region's unique charm. Experience {keywords} that showcase the best of local culture.

Plan your visit today! 🗺️✨

#VisitLocal #Destination`,

        rental: `🏠 Your perfect {season} getaway in {location}! 

Experience local life with our vacation rentals, perfect for {target}. Enjoy {keywords} in the comfort of your own space.

Book your stay today! 🏡✨

#VacationRental #LocalLiving`
    },

    email: {
        hotel: `Subject: Your Perfect {season} Getaway Awaits in {location}

Dear Valued Guest,

As {season} approaches, we're excited to invite you to experience the magic of {location}. Our hotel offers {target} the perfect combination of comfort, adventure, and relaxation.

This {season}, enjoy:
✅ {keywords}
✅ Seasonal activities and experiences
✅ Exceptional service with a {tone} approach

Special {season} Offer: Book by [date] and save 20% on your stay!

We can't wait to welcome you to {location}.

Warm regards,
The Team at [Hotel Name]`,

        restaurant: `Subject: Savor {season} Flavors at {location}'s Premier Restaurant

Hello Food Lover,

Our new {season} menu has arrived, and we're thrilled to share these incredible flavors with you! Perfect for {target}, our seasonal offerings showcase the best of {location}.

Featured This {season}:
🍽️ Farm-fresh seasonal ingredients
🍽️ {keywords}
🍽️ Perfect atmosphere for memorable dining

Book your table today and taste the difference that fresh, local ingredients make.

Bon Appétit!
[Restaurant Name] Team`,

        tour: `Subject: Explore {location} This {season} - Exclusive Tour Offer

Dear Adventure Seeker,

This {season} is the perfect time to discover {location} with our expert local guides. Our tours are specially designed for {target} who want to experience the authentic side of our destination.

What You'll Discover:
🗺️ Hidden local gems and secret spots
🗺️ {keywords} that showcase our region's beauty
🗺️ Insider knowledge from passionate local guides

Special {season} Rate: Save 15% when you book this week!

Ready to explore {location} like a local?

Best regards,
[Tour Company Name] Team`,

        attraction: `Subject: Experience the Magic of {location} This {season}

Dear Visitor,

We're excited to invite you to experience the most thrilling attraction in {location} this {season}! Our venue is perfectly designed for {target} seeking unforgettable experiences.

This {season} Features:
🎢 {keywords}
🎢 Special seasonal programming
🎢 Perfect activities for {target}

Limited Time Offer: Buy one, get one 50% off for {season} visits!

Don't miss out on the excitement - book your visit today!

See you soon,
[Attraction Name] Team`,

        destination: `Subject: Welcome to {location} - Your Perfect {season} Destination

Dear Traveler,

We're delighted to introduce you to {location}, the premier destination for {target} seeking authentic experiences and unforgettable memories. This {season}, our region offers {keywords} that showcase the best of local culture and natural beauty.

Why Choose {location} This {season}:
🌍 Unique cultural experiences
🌍 {keywords} that highlight our region's charm
🌍 Perfect climate and conditions for {target}

Special {season} Package: Save 25% on your first visit!

Start planning your {season} adventure in {location} today.

Warm regards,
[Destination Marketing Team]`,

        rental: `Subject: Your Perfect {season} Home in {location}

Dear Guest,

Experience {location} like a local with our carefully curated vacation rentals, perfect for {target} seeking comfort, privacy, and authentic local experiences. This {season}, discover why our properties are the preferred choice for discerning travelers.

What Makes Our Rentals Special:
🏠 {keywords} that create a home-like atmosphere
🏠 Prime locations near local attractions
🏠 Professional management and support
🏠 Perfect for {target}

Special {season} Rate: 20% off for stays of 7+ nights!

Book your perfect {season} getaway today.

Best regards,
[Property Management Team]`
    },

    ad: {
        hotel: `Discover {location} This {season}! 
Perfect for {target} seeking {keywords}. 
Book now and save 25%! 
#YourPerfectGetaway`,

        restaurant: `Authentic {location} Dining 🍽️
Fresh {season} menu now available!
Perfect for {target}
Reserve today! #LocalFlavors`,

        tour: `Explore {location} Like a Local! 🗺️
{season} tours now booking for {target}
Experience {keywords}
Book today! #LocalTours`,

        attraction: `Experience the Thrill of {location}! 🎢
{season} adventures for {target}
Featuring {keywords}
Visit today! #LocalAttraction`,

        destination: `Welcome to {location}! 🌍
Perfect {season} destination for {target}
Discover {keywords}
Plan your visit! #VisitLocal`,

        rental: `Your Perfect {season} Home in {location}! 🏠
Vacation rentals for {target}
Featuring {keywords}
Book today! #VacationRental`
    },

    description: {
        hotel: `Welcome to our premier hotel in {location}, where {target} discover the perfect blend of luxury and comfort. Our {season} offerings include {keywords} that create unforgettable experiences. Located in the heart of {location}, we provide easy access to local attractions while offering a peaceful retreat for our guests.`,

        restaurant: `Experience authentic {location} cuisine at our restaurant, where {target} enjoy seasonal specialties and local flavors. Our {season} menu features {keywords} that showcase the region's culinary heritage. We pride ourselves on creating memorable dining experiences in a warm, welcoming atmosphere.`,

        tour: `Discover {location} with our expert local guides, offering {target} authentic experiences and insider knowledge. Our {season} tours feature {keywords} that showcase the hidden gems and local secrets of our region. We specialize in creating personalized adventures that go beyond typical tourist experiences.`,

        attraction: `Experience the excitement of {location}'s premier attraction, designed specifically for {target} seeking adventure and entertainment. Our {season} programming includes {keywords} that create unforgettable memories. We offer a perfect blend of thrills and family-friendly fun in a safe, welcoming environment.`,

        destination: `Welcome to {location}, the perfect destination for {target} seeking authentic experiences and natural beauty. Our region offers {keywords} that showcase the unique charm and cultural heritage of our area. This {season}, discover why {location} is becoming the preferred choice for discerning travelers.`,

        rental: `Experience {location} like a local with our carefully curated vacation rentals, perfect for {target} seeking comfort and privacy. Our properties feature {keywords} that create the perfect home-away-from-home atmosphere. Located in prime areas, our rentals provide easy access to local attractions while offering a peaceful retreat.`
    },

    newsletter: {
        hotel: `🏨 {location} Hotel Newsletter - {season} Edition

Dear Valued Guest,

As {season} approaches, we're excited to share the latest updates from our hotel in {location}. This season brings new opportunities for {target} to experience the magic of our destination.

What's New This {season}:
✨ {keywords}
✨ Seasonal activities and experiences
✨ Special packages for {target}

Upcoming Events:
📅 [Event 1] - Perfect for {target}
📅 [Event 2] - Featuring {keywords}
📅 [Event 3] - Seasonal highlights

Book your {season} getaway today and discover why {location} is the perfect destination for {target}.

Warm regards,
The Team at [Hotel Name]`,

        restaurant: `🍽️ {location} Restaurant Newsletter - {season} Menu Launch

Hello Food Lover,

We're thrilled to announce our new {season} menu, featuring the freshest local ingredients and traditional flavors of {location}. Our seasonal offerings are perfect for {target} seeking authentic culinary experiences.

New {season} Menu Highlights:
🍽️ {keywords}
🍽️ Seasonal specialties
🍽️ Perfect pairings for {target}

Special {season} Events:
📅 Wine pairing dinners
📅 Chef's table experiences
📅 Seasonal cooking classes

Reserve your table today and taste the difference that fresh, local ingredients make.

Bon Appétit!
[Restaurant Name] Team`
    }
};

// Content variations for different approaches
const VARIATIONS = {
    hotel: [
        "Escape to luxury in {location}",
        "Your dream {season} getaway awaits",
        "Discover paradise at our {location} retreat",
        "Experience {location} like never before",
        "Your perfect {season} sanctuary in {location}"
    ],
    restaurant: [
        "Taste the authentic flavors of {location}",
        "Where local ingredients meet culinary excellence",
        "Your table for unforgettable dining awaits",
        "Savor the essence of {location}",
        "Culinary adventures await in {location}"
    ],
    tour: [
        "Explore {location} with local experts",
        "Discover hidden gems in {location}",
        "Your adventure in {location} begins here",
        "Experience {location} like a local",
        "Uncover the secrets of {location}"
    ],
    attraction: [
        "Experience the thrill of {location}",
        "Adventure awaits in {location}",
        "Create memories in {location}",
        "Fun for all ages in {location}",
        "Excitement around every corner in {location}"
    ],
    destination: [
        "Welcome to {location}",
        "Discover the magic of {location}",
        "Your perfect destination: {location}",
        "Experience {location} in a new way",
        "The beauty of {location} awaits"
    ],
    rental: [
        "Your home away from home in {location}",
        "Live like a local in {location}",
        "Comfort and privacy in {location}",
        "Your perfect base in {location}",
        "Experience {location} from your own space"
    ]
};

// Hashtag sets organized by business type
const HASHTAG_SETS = {
    hotel: ["#Travel", "#Vacation", "#Hotel", "#Getaway", "#Tourism", "#Staycation", "#Luxury", "#Weekend", "#TravelMore", "#VisitLocal"],
    restaurant: ["#LocalEats", "#FarmToTable", "#FreshFlavors", "#Dining", "#Foodie", "#LocalCuisine", "#Restaurant", "#TasteLocal", "#FoodLover", "#Culinary"],
    tour: ["#Adventure", "#Tours", "#Explore", "#LocalGuide", "#Sightseeing", "#Experience", "#Discovery", "#Tourism", "#TravelLocal", "#ExploreMore"],
    attraction: ["#FunForAll", "#LocalAttraction", "#MustSee", "#Experience", "#Adventure", "#Tourism", "#VisitLocal", "#Explore", "#Entertainment", "#FamilyFun"],
    destination: ["#Travel", "#Destination", "#VisitLocal", "#Explore", "#Tourism", "#TravelMore", "#LocalExperience", "#Discover", "#Wanderlust", "#TravelLocal"],
    rental: ["#VacationRental", "#LocalLiving", "#HomeAwayFromHome", "#Travel", "#StayLocal", "#Vacation", "#Rental", "#LocalExperience", "#Comfort", "#Privacy"]
};

// Utility function to sanitize input
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim();
}

// Function to get template with fallbacks
function getTemplate(contentType, businessType) {
    return TEMPLATES[contentType]?.[businessType] || 
           TEMPLATES[contentType]?.hotel || 
           "Your customized content will appear here based on your selections.";
}

// Function to get variations
function getVariations(businessType) {
    return VARIATIONS[businessType] || VARIATIONS.hotel;
}

// Function to get hashtags
function getHashtags(businessType) {
    return HASHTAG_SETS[businessType] || HASHTAG_SETS.hotel;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TEMPLATES,
        VARIATIONS,
        HASHTAG_SETS,
        sanitizeInput,
        getTemplate,
        getVariations,
        getHashtags
    };
} 