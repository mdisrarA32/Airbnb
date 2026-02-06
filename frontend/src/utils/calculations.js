
import { MdTrendingUp, MdTrendingDown, MdFlashOn } from 'react-icons/md';

/**
 * Calculate demand level for a listing
 * Since we don't have real booking history in the frontend,
 * we'll derive this from ratings and a stable hash of the ID to simulate data.
 */
export const calculateDemand = (listing) => {
    // Simulate booking count based on rating * random factor (stable by ID)
    const idSum = listing._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const simulatedBookings = (listing.ratings * 10) + (idSum % 20);

    if (simulatedBookings > 60) {
        return {
            label: "High Demand",
            color: "bg-rose-100 text-rose-700 border-rose-200",
            icon: MdFlashOn,
            text: "Filling Fast"
        };
    } else if (simulatedBookings > 40) {
        return {
            label: "Popular",
            color: "bg-orange-100 text-orange-700 border-orange-200",
            icon: MdTrendingUp,
            text: "High Interest"
        };
    }
    return null; // Normal demand
};

/**
 * Calculate smart price range for a host based on city and category
 */
export const getSmartPriceSuggestion = (city, category, allListings) => {
    if (!city || !allListings) return null;

    const similarListings = allListings.filter(l => {
        const cityMatch = l.city.toLowerCase() === city.toLowerCase();
        const catMatch = category ? l.category.toLowerCase() === category.toLowerCase() : true;
        return cityMatch && catMatch;
    });

    if (similarListings.length === 0) return null;

    const totalRent = similarListings.reduce((sum, l) => sum + Number(l.rent), 0);
    const avgRent = totalRent / similarListings.length;

    return {
        min: Math.floor(avgRent * 0.9),
        max: Math.ceil(avgRent * 1.1),
        avg: Math.round(avgRent)
    };
};

/**
 * Calculate booking confidence score (0-100)
 */
export const getConfidenceScore = (listing) => {
    if (!listing) return 0;

    let score = 70; // Base score
    score += (listing.ratings - 3) * 10; // Add points for ratings > 3
    if (listing.isBooked) score += 5;

    // Simulate verified host
    if (listing.host) score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
};

/**
 * Calculate Host Performance Score (0.0 - 5.0)
 */
export const getHostScore = (listing) => {
    // Base on ratings mostly since we lack deep host data
    let score = Number(listing.ratings) || 4.5;

    // Add small random variance based on ID
    const idSum = listing._id ? listing._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    const variance = (idSum % 10) / 10 - 0.5; // -0.5 to 0.5

    return (Math.min(5, Math.max(0, score + variance))).toFixed(1);
};

export const saveToRecentlyViewed = (listing) => {
    try {
        const stored = localStorage.getItem('recentlyViewed');
        let viewed = stored ? JSON.parse(stored) : [];

        // Remove duplicate if exists
        viewed = viewed.filter(item => item._id !== listing._id);

        // Add to front
        viewed.unshift({
            _id: listing._id,
            title: listing.title,
            image1: listing.image1,
            image2: listing.image2,
            image3: listing.image3,
            city: listing.city,
            rent: listing.rent,
            ratings: listing.ratings
        });

        // Keep max 5
        if (viewed.length > 5) viewed = viewed.slice(0, 5);

        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    } catch (e) {
        console.error("Failed to save recently viewed", e);
    }
};

export const getRecentlyViewed = () => {
    try {
        const stored = localStorage.getItem('recentlyViewed');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};
