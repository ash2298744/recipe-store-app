import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';

const SavedRecipe = () => {
  const [savedRecipe, setSavedRecipe] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipe/${userID}`);
        setSavedRecipe(response.data.savedRecipe);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSavedRecipe();
  }, [])

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {
          savedRecipe.map((savedRecipe)=>(
            <li key={savedRecipe?._id}>
              <div>
                <h2>{savedRecipe.name}</h2>
                
              </div>
              <div className="instructions">
                <p>{savedRecipe.instructions}</p>
              </div>
              <img src={savedRecipe.imageUrl} alt={savedRecipe.name} />
              <p>Cooking Time : {savedRecipe.cookingTime} minutes</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SavedRecipe