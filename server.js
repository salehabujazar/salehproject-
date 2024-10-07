const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000; // You can change this to another port if needed

const apiKey = process.env.GNEWS_API_KEY || 'default_key_if_not_found';

// Enable CORS to allow frontend requests
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch news from GNews API
app.get('/news', async (req, res) => {
    try {
        const country = req.query.country || 'United States'; // Default to 'United States'
        const newsUrl = `https://gnews.io/api/v4/search?q=${country}&token=${apiKey}`;
        const response = await axios.get(newsUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching news' });
    }
});

// Serve the ss.html as the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ss.html')); // Ensure ss.html is in the public folder
});

// Serve the news.html page
app.get('/news.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'news.html')); // Serve news.html
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


