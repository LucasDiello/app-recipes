import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [filter, setFilter] = useState('all');
  const [linkCopy, setLinkCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    categories,
    setCategories,
    loading,
    setLoading,
    error,
    setError,
    linkCopy,
    setLinkCopy,
    checkboxes,
    setCheckboxes,
    filter,
    setFilter,
    menuOpen,
    setMenuOpen,
    userLogged,
    setUserLogged,
  }), [recipes, categories, loading, error, linkCopy,
    checkboxes, filter, menuOpen, userLogged]);

  return (
    <RecipesContext.Provider value={ store }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
