import React, { useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateRecipe = () => {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRecipe({...recipe, [name] : value});
    
  } 

  const handleIngredientChange = (e, idx) => {
    const {value} = e.target;
    const ingredient = recipe.ingredients;
    ingredient[idx] = value;
    setRecipe({...recipe, ingredient});
  }

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipe", recipe, {
        headers : {
          authorization : cookies.access_token
        }
      });
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='name'>Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
          <label htmlFor='ingredients'>Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input key={index} type="text" name="ingredients" valu={ingredient} onChange={(e) => handleIngredientChange(e, index)}/>
          ))}
          <button onClick={addIngredient} type="button">Add More</button>

          <label htmlFor='instructions'>Instructions</label>
          <textarea name="instructions" id="instructions" onChange={handleChange}/>
          <label htmlFor='imageUrl'>Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
          <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
          <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
          <button type="submit">Submit Recipe</button>
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe