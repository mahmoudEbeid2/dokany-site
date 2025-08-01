import React, { useEffect, useState } from 'react';
import CategoryCard from '../categoryCard/CategoryCard';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZHM0NHZhODAwMTZydW1mZGJuN3V5YTMiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzU0MDA5ODQxLCJleHAiOjE3NTQ2MTQ2NDF9.PUwYfW4m8q82r1gGVxdOUnFMyDy3bD7KvpsR7TczZZU';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          'https://dokany-api-production.up.railway.app/categories/seller',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } 
    };

    fetchCategories();
  }, []);


  return (
    
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryCard key={category.id} name={category.name} image={category.image} />
      ))}
    </div>
  );
};

export default Categories;
