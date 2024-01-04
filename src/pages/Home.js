import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import {useCookies} from 'react-cookie';

const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();

  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipe");
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipe();

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipe/ids/${userID}`);
        setSavedRecipe(response.data.savedRecipe);
      } catch (error) {
        console.error(error);
      }
    }

    if(cookies.access_token){
      fetchSavedRecipe();
    }
    
  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipe", {
        recipeID,
        userID,
      }, {
        headers : {
          authorization : cookies.access_token
        }
      });
      setSavedRecipe(response.data.savedRecipe);
    } catch (error) {
      console.error(error);
    }
  }

  const isRecipeSaved = (id) => {
    return savedRecipe?.includes(id);
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {
          recipe.map((recipe)=>(
            <li key={recipe?._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe?._id)}>
                  {
                    isRecipeSaved(recipe?._id) ? "Saved" : "Save"
                  }
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time : {recipe.cookingTime} minutes</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home