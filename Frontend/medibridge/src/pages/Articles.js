import React from 'react';
import './Articles.css';

const articles = [
  {
    title: 'Transforming Cancer Care through Genomic Testing',
    author: 'ByDr. Sanchari Sinha Dutta, Ph.D.',
    Reviewed: 'By Lily Ramsey, LLM',
    date: 'June 28, 2023',
    content: 'Cancer genome testing has revolutionized the field of cancer care by easing the development of personalized medicine.',
    link: 'https://www.news-medical.net/health/Transforming-Cancer-Care-through-Genomic-Testing.aspx',
    image: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20230628093746/ri/950/src/images/Article_Images/ImageForArticle_23779_16879594656106797.jpg',
  },
  {
    title: 'How Biotech Companies are Reshaping the Mental Health Landscape',
    author: 'By Sarah Moore',
    Reviewed: 'By Danielle Ellis, B.Sc.',
    date: 'June 5, 2023',
    content: 'The COVID-19 pandemic highlighted the global burden of mental health disorders. In the US, rates of anxiety, depression and substance use disorder have all risen following the pandemic. The need to prioritize mental health is more obvious than ever, and large and small companies have responded by accelerating innovation in this area.',
    link: 'https://www.news-medical.net/health/How-Biotech-Companies-are-Reshaping-the-Mental-Health-Landscape.aspx',
    image: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20230602063457/ri/1000/src/images/Article_Images/ImageForArticle_23758_16857020943099389.jpg',
  },
  // Add more articles as needed
];

const Articles = () => {
  return (
    <div className="articles-container">
      <h1>Popular Medical Articles</h1>
      {articles.map((article, index) => (
        <div className="article-card" key={index}>
          <img src={article.image} alt={article.title} />
          <h2>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
            </a>
            </h2>
          <p>
            <strong>Author:</strong> {article.author}
          </p>
          <p>
            <strong>Date:</strong> {article.date}
          </p>
          <p>{article.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Articles;
