import Link from "next/link";
import Image from "next/image";
import '../styles/global.css'
import '../styles/landingPage.css'
import Header from "./header";
import React, { useState } from "react";
import { getAllPost } from "@/components/fetchRecipe";

const FEATURED_RECIPE_COUNT = 6;

export async function getStaticProps() {
  const data = await getAllPost();
  const posts = data.recipes || [];

  const featuredPosts = [...posts].sort((a, b) => b.rating - a.rating).slice(0, FEATURED_RECIPE_COUNT);

  return {
    props: { posts: featuredPosts },
    revalidate: 60,
  };
}

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="landingPage-Container">
        <Header />
        <div className="title" style={{ fontSize: '30px' }}>
          <h1>All your favorite <span style={{ color: '#FF5F66' }}>recipes,</span><span style={{ color: '#FF5F66' }}> in one place</span></h1>
        </div>
        <div className="navigationButton">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px',
              width: '50vw',
              height: '40px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '20px'
            }}
          />
        </div>
        <div className="prereload">
          {filteredPosts.map((post) => (
            <div key={post.id} className="recipeWrapper" style={{ margin: '10px' }}>
              <Link href={`/recipes/${post.id}`} style={{ textDecoration: 'none' }}>
                <div>
                <Image
                  src={post.image} // Assuming your local image names relate to the post ID
                  alt={post.name}
                  width={300}
                  height={300}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
                  <p style={{ color: '#A9DFCF', textAlign: 'left', fontWeight: 'bold', marginTop: '20px', minHeight: '4rem', display: 'flex', alignItems: 'center' }}>{post.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
