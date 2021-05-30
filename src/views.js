import { getFilters } from './filters';
import { getRecipes, toggleIngredient, ingredientCountUpdate } from './recipes';

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
  // Setup recipe container
  const recipeContainer = document.createElement('div');
  recipeContainer.classList.add('recipe-card-container');

  // Setup recipe card
  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe-card');

  const recipeLinkWrapper = document.createElement('a');

  // Setup recipe icon for recipe card
  const recipeIcon = document.createElement('img');
  recipeIcon.src = './imgs/recipe-card_icon.png';
  recipeIcon.alt = 'recipe card icon';
  recipeIcon.classList.add('recipe-card__icon');

  // Setup recip title for recipe card
  const recipeTitle = document.createElement('h2');
  if (recipe.title.length > 0) {
    recipeTitle.textContent = recipe.title;
    recipeTitle.classList.add('recipe-card__title');
  } else {
    recipeTitle.textContent = 'nothing';
  }

  // Setup recipe card description
  const recipeDescription = document.createElement('span');
  recipeDescription.textContent = `You have ${recipe.ingredientCount[1]} of the ${recipe.ingredientCount[0]} ingredients needed.`;
  recipeDescription.classList.add('recipe-card__description');

  // Setup the link for recipe card to redirect to form/edit page\
  recipeLinkWrapper.setAttribute('href', `/form.html#${recipe.id}`);

  // Append all recipe card components to recipe card container
  recipeDiv.appendChild(recipeTitle);
  recipeDiv.appendChild(recipeDescription);
  recipeContainer.appendChild(recipeIcon);
  recipeContainer.appendChild(recipeDiv);
  recipeLinkWrapper.appendChild(recipeContainer);

  return recipeLinkWrapper;
};

// Initialize form page
const initializeFormPage = (recipeId) => {
  const recipeTitle = document.querySelector('.recipe-title');
  const stepsInstructions = document.querySelector('.recipe-instructions__steps');
  const ingredientList = document.querySelector('.ingredient-block');
  const recipes = getRecipes();
  const recipe = recipes.find((rcpe) => rcpe.id === recipeId);

  if (!recipe) {
    window.location.assign('/index.html');
  }

  recipeTitle.value = recipe.title;
  stepsInstructions.value = recipe.recipeInstructions;

  // clean ingredient list container
  ingredientList.innerHTML = '';

  /* Create each ingredient list item with an id for each ingredient line,
  so we can delete it or check it off */

  recipe.ingredients.forEach((ingredient) => {
    const ingredientLine = document.createElement('div');
    ingredientLine.classList.add('ingredient-list__ingredient-line');
    ingredientLine.setAttribute('id', `${ingredient.id}`);

    const ingredientText = document.createElement('h3');
    ingredientText.textContent = ingredient.text;
    ingredientText.classList.add('ingredient-line__ingredient');

    const ingredientCheckbox = document.createElement('input');
    ingredientCheckbox.setAttribute('type', 'checkbox');
    ingredientCheckbox.checked = ingredient.checked;
    ingredientCheckbox.classList.add('ingredient-line__checkbox');

    ingredientCheckbox.addEventListener('change', () => {
      toggleIngredient(recipe.id, ingredient.id);
      ingredientCountUpdate(recipe.id);
    });

    const ingredientRemove = document.createElement('button');
    ingredientRemove.textContent = 'REMOVE';
    ingredientRemove.classList.add('ingredient-line__remove-button');
    ingredientLine.appendChild(ingredientCheckbox);
    ingredientLine.appendChild(ingredientText);
    ingredientLine.appendChild(ingredientRemove);
    ingredientList.appendChild(ingredientLine);
  });
};

// Render recipe list  on main page
const renderRecipes = () => {
  const recipesList = document.querySelector('#flex-container');
  const filters = getFilters();
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase()
    .includes(filters.searchText.toLocaleLowerCase()));

  recipesList.innerHTML = '';

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      const recipeCard = generateRecipeDOM(recipe);
      recipesList.appendChild(recipeCard);
    });
  } else {
    const emptyMessage = document.createElement('h3');
    emptyMessage.textContent = 'No recipes';
    emptyMessage.classList.add('empty-message');
    recipesList.appendChild(emptyMessage);
  }
};

export { generateRecipeDOM, renderRecipes, initializeFormPage };
