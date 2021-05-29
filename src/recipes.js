// eslint-disable-next-line import/no-extraneous-dependencies
import uuidv4 from 'uuid/v4';

let recipes = [];

// Read existing recipes frokm localStorage
const loadRecipes = () => {
  const notesJSON = localStorage.getItem('recipes');

  try {
    recipes = notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    recipes = [];
  }
};

// Save the notes to localStorage
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// Expose recipes from module
const getRecipes = () => recipes;

// Create recipe
const createRecipe = () => {
  const id = uuidv4();

  recipes.push({
    id,
    title: '',
    recipeInstructions: '',
    ingredients: [],
    ingredientCount: [0, 0],
  });
  saveRecipes();
  return id;
};

// Add ingredients to recipe
const addIngredient = (recipeId, ingredient) => {
  const recipe = recipes.find((rcpe) => rcpe.id === recipeId);
  recipe.ingredients.push(ingredient);
  recipe.ingredientCount[0] = recipe.ingredients.length;
  saveRecipes();
};
// Ingredient count to be rendered on each recipe card
const ingredientCountUpdate = (recipeId) => {
  const recipe = recipes.find((rcpe) => rcpe.id === recipeId);
  const ingredientsChecked = recipe.ingredients.filter((ingredient) => ingredient.checked);
  recipe.ingredientCount[0] = recipe.ingredients.length;
  recipe.ingredientCount[1] = ingredientsChecked.length;
  console.log(recipe.ingredientCount);
  saveRecipes();
};
// Update recipe
const updateRecipe = (id, updates) => {
  const recipe = recipes.find((rcpe) => rcpe.id === id);

  if (!recipe) {
    return;
  }

  if (typeof updates.title === 'string') {
    recipe.title = updates.title;
  }

  if (typeof updates.recipeInstructions === 'string') {
    recipe.recipeInstructions = updates.recipeInstructions;
  }
  //* ***may need to add an id to each  ingredient line
  if (updates.ingredients !== undefined) {
    recipe.ingredients = updates.ingredients;
  }

  saveRecipes();
  // return recipe;
};

// Remove a recipe from the list
const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    saveRecipes();
  }
};

// Remove an ingredient from the ingredient list
const removeIngredient = (recipeID, ingredientID) => {
  const recipe = recipes.find((rcpe) => rcpe.id === recipeID);
  const ingredientIndex = recipe.ingredients
    .findIndex((ingredient) => ingredient.id === ingredientID);

  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1);
    recipe.ingredientCount[0] = recipe.ingredients.length;
    ingredientCountUpdate(recipe.id);
    saveRecipes();
  }
};

const toggleIngredient = (recipeID, ingredientID) => {
  const recipe = recipes.find((rcpe) => rcpe.id === recipeID);
  const ingredient = recipe.ingredients.find((ingrdnt) => ingrdnt.id === ingredientID);
  if (ingredient) {
    ingredient.checked = !ingredient.checked;
    saveRecipes();
  }
};

loadRecipes();

export {
  getRecipes, createRecipe, removeRecipe, loadRecipes, updateRecipe, saveRecipes, removeIngredient,
  toggleIngredient, addIngredient, ingredientCountUpdate,
};
