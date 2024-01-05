import React from 'react';
import ArticleCard from '../ArticleCard'; // Assuming you have a VerticalCard component
import { useData } from '../../providers/DataProvider';


function NewsPage(){

  const {articles} = useData()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        padding: '16px',
      }}
    >
      {articles.map((article, index) => (
        <ArticleCard {...article} />
      ))}
    </div>
  );
};

export default NewsPage;