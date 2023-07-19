import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import { handleSaveProgress, getStorage, initialIngredients } from '../utils/functions';
import RecipesContext from '../context/RecipesContext';

export default function IngredientsList({ recipe, isInProgress }) {
  const { checkboxes, setCheckboxes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const NAME_URL = pathname.split('/')[1];
  const KEY_BASE = NAME_URL === 'meals' ? 'Meal' : 'Drink';
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => (key.includes('strIngredient') && value));

  useEffect(() => {
    const recipesProgress = getStorage('inProgressRecipes');
    const id = recipe[`id${KEY_BASE}`];
    let usedIngredients = [];
    if (recipesProgress && recipesProgress[NAME_URL] && recipesProgress[NAME_URL][id]) {
      usedIngredients = recipesProgress[NAME_URL][id];
    }
    setCheckboxes(initialIngredients(ingredients, usedIngredients));
  }, []);

  const handleChange = (key, value) => {
    const newCheckboxes = {
      ...checkboxes,
      [key]: checkboxes[key] === '' ? value : '',
    };
    setCheckboxes(newCheckboxes);
    handleSaveProgress(recipe[`id${KEY_BASE}`], NAME_URL, newCheckboxes);
  };

  return ingredients.map(([key, value], index) => (
    <li
      style={ { listStyle: isInProgress ? 'none' : 'initial' } }
      key={ key }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {
        isInProgress ? (
          <label
            style={ { textDecoration: checkboxes[key] ? 'line-through' : 'none' } }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ key }
          >
            <input
              type="checkbox"
              id={ key }
              name={ key }
              checked={ !!checkboxes[key] }
              onChange={ () => handleChange(key, value) }
            />
            {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
          </label>
        ) : (
          `${value} - ${recipe[`strMeasure${index + 1}`]}`
        )
      }
    </li>
  ));
}

IngredientsList.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};