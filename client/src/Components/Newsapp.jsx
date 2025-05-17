import React, { useEffect, useState } from 'react'
import Card from './Card'
const BACKEND_URL = 'https://newsy-hu8f.onrender.com';
const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [inputText, setInputText] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/news?q=${search}`);
      const jsonData = await response.json();
      const dt = jsonData.articles?.slice(0, 10) || [];
      setNewsData(dt);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setInputText(e.target.value); // Just update typing state
  };

  const handleSearchClick = () => {
    setSearch(inputText); // Now trigger actual search
  };

  const userInput = (event) => {
    setSearch(event.target.value); // Category buttons still update search directly
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Newsy</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
        </ul>
        <div className='searchBar'>
          <input
            type='text'
            placeholder='Search News'
            value={inputText}
            onChange={handleInput}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </nav>

      <div>
        <p className='head'>Stay Updated with Newsy</p>
      </div>

      <div className='categoryBtn'>
        <button onClick={userInput} value="sports">Sports</button>
        <button onClick={userInput} value="politics">Politics</button>
        <button onClick={userInput} value="entertainment">Entertainment</button>
        <button onClick={userInput} value="health">Health</button>
        <button onClick={userInput} value="fitness">Fitness</button>
      </div>

      <div>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '10px', color: '#555' }}>Fetching the latest news...</p>
          </div>
        ) : (
          newsData ? <Card data={newsData} /> : null
        )}

      </div>
      <footer className="footer">
        <p>
          © 2025 All rights reserved by{' '}
          <a href="https://mrshivamroy.github.io" target="_blank" rel="noopener noreferrer">
            Shivam Roy
          </a>
        </p>
        <p>All data are collected from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a></p>
      </footer>

    </div>
  )
};

export default Newsapp;
