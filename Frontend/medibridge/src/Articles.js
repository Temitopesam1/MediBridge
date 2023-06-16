import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles
    axios.get('/api/articles')
      .then(response => setArticles(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Medical Articles</h2>
      {articles.map(article => (
        <div key={article.id}>
          <h4>{article.title}</h4>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalArticles;
