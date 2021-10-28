import React from 'react';
import FavoriteView from '../../home/favorite/favorite';
import HomeView from '../../home/home/home';
import ProfileView from '../../home/profil/profil';
import RecipeView from '../../home/receipe/receipe';
import AddRecipeView from '../../home/add_recipe/addrecipe';
export function getScreen(screen) {
  switch (screen) {
    case 1:
      return <HomeView />;
    case 2:
      return <RecipeView />;
    case 3:
      return <AddRecipeView />;
    case 4:
      return <FavoriteView />;
    case 5:
      return <ProfileView />;
    default:
      return <HomeView />;
  }
}
