// eslint-disable-next-line import/no-extraneous-dependencies
import uuidv4 from 'uuid/v4';
import {
  updateRecipe, removeRecipe, addIngredient, removeIngredient,
} from './recipes';
import { initializeFormPage } from './views';

const recipeTitle = document.querySelector('.recipe-title');
const stepsInstructions = document.querySelector('.recipe-instructions__steps');
const ingredienttoAdd = document.querySelector('.new-ingredient__ingredient');
const ingredientAddButton = document.querySelector('.new-ingredient__submit');
const removeRecipeButton = document.querySelector('.delete-section__button');
const recipeId = window.location.hash.substring(1);

initializeFormPage(recipeId);

recipeTitle.addEventListener('input', (e) => {
  updateRecipe(recipeId, {
    title: e.target.value,
  });
});

stepsInstructions.addEventListener('input', (e) => {
  updateRecipe(recipeId, {
    recipeInstructions: e.target.value,
  });
});

ingredientAddButton.addEventListener('click', () => {
  addIngredient(recipeId, {
    id: uuidv4(),
    text: ingredienttoAdd.value,
    checked: false,
  });
  initializeFormPage(recipeId);
  ingredienttoAdd.value = '';
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('ingredient-line__remove-button')) {
    const ingredientId = e.target.parentElement.id;
    removeIngredient(recipeId, ingredientId);
    initializeFormPage(recipeId);
  }
});

removeRecipeButton.addEventListener('click', () => {
  removeRecipe(recipeId);
  window.location.assign('/index.html');
});
window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    initializeFormPage(recipeId);
  }
});
