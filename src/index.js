import {createRecipe, loadRecipes} from './recipes';
import {setFilters} from './filters';
import { renderRecipes } from './views';

renderRecipes();

document.querySelector('.new-recipe-button').addEventListener('click', (e) => {
    const id = createRecipe();
    location.assign(`/form.html#${id}`);
})

document.querySelector('.search-bar__input').addEventListener('input', e => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes();
})
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes();
        renderRecipes();
    }
})