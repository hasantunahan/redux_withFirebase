import React from 'react';
import FavoriteView from '../../home/favorite/favorite';
import HomeView from '../../home/home/home';
import ProfileView from '../../home/profil/profil';
import RecipeView from '../../home/receipe/receipe';
import SearchView from '../../home/search/search';
import {Text} from 'react-native';
export function getScreen(screen) {
  switch (screen) {
    case 1:
      return <HomeView />;
    case 2:
      return <RecipeView />;
    case 3:
      return <SearchView />;
    case 4:
      return <FavoriteView />;
    case 5:
      return <ProfileView />;
    default:
      return <HomeView />;
  }
}

export function getHeader(screen) {
  switch (screen) {
    case 1:
      return <Text>{'Home'}</Text>;
    case 2:
      return <Text>{'Recipe'}</Text>;
    case 3:
      return <Text>{'Search'}</Text>;
    case 4:
      return <Text>{'Favorite'}</Text>;
    case 5:
      return <Text>{'Profile'}</Text>;
    default:
      return <Text>{'Home'}</Text>;
  }
}
