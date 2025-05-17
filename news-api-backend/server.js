// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const NEWS_API_KEY = '9c3ed8ee95884dec979460a60f96675b';

app.use(cors()); // Allows frontend to access this backend

app.get('/news', async (req, res) => {
  const query = req.query.q || 'india';
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT}`);
});
