export async function fetchRecipeData() {
    const res = await fetch(`https://dummyjson.com/recipes?limit=0`);
  
    if (res.status === 200) {
      const data = await res.json();
      
      return data;
    } else {
      console.log('Error Fetching');
      return [];
    }
  }
  
  export async function getAllPost() {
    return await fetchRecipeData();
  }
  
  export async function fetchDataByID(id) {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log('Error Fetching book by ID:', id);
      return null;
    }
  }
  