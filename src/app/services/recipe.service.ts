import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  /* PRIVATE: Avoiding to access the array from outside directly */
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'this is simply test 1',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/british_shakshuka_26737_16x9.jpg'
    ),
    new Recipe(
      'A test recipe 2',
      'this is simply test 2',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/british_shakshuka_26737_16x9.jpg'
    ),
    new Recipe(
      'A test recipe 3',
      'this is simply test 3',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/british_shakshuka_26737_16x9.jpg'
    )
  ];

  constructor() {}

  getRecipes() {
    /* with slice actually we're returning a copy of the recipes array */
    return this.recipes.slice();
  }
}
