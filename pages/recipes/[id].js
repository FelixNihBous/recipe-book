import { fetchDataByID, fetchRecipeData, getAllPost } from '@/components/fetchRecipe';
import Image from 'next/image'
import '../../styles/dynamicRoute.css'
import '../../styles/global.css'
import React from 'react';
import Header from '../header';

export async function getStaticPaths() {
  // Pre-render pages for books with IDs 1-10
  const paths = [];
  for (let id = 1; id <= 10; id++) {
    paths.push({ params: { id: id.toString() } });
  }
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await fetchDataByID(parseInt(params.id));
  if (!data) {
    return { notFound: true };
  }
  return {
    props: { book: data },
    revalidate: 60,
  };
}

export default function BookPage({ book }) {
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className='recipeDetail' style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        <div className='wrapper'>
          <h1 style={{ color: '#63BBA0' }}>{book.name}</h1>
          <div className='infoDetails'>
            <p>Category: <span style={{ color: 'orangered' }}>{Object.values(book.tags).join(', ')}</span></p>
            <p >Difficulty: <span style={{ color: 'orangered' }}>{book.difficulty}</span></p>
            <p>Cooking Time: <span style={{ color: 'orangered' }}>{book.cookTimeMinutes} Minutes</span></p>
            <p>Nutrition: <span style={{ color: 'orangered' }}>{book.caloriesPerServing} Calories</span></p>
          </div>
          <div className='imageAndIngredients'>
            <Image
              src={book.image}
              alt=""
              width={300}
              height={300}
              />
            <div className='ingredient'>
              <h1>Ingredients</h1>
              <ul>
                {Array.isArray(book.ingredients) ? (
                  book.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  <li>{book.ingredients}</li>
                )}
              </ul>
            </div>
          </div>
          <div className='instruction'>
            <h1>Instruction</h1>
            {Array.isArray(book.instructions) ? (
              book.instructions	.map((instructions	, index) => (
                <p style={{color: 'gray'}} key={index}>{instructions	}</p>
              ))
            ) : (
              <p style={{color: 'gray'}}>{book.instructions}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}