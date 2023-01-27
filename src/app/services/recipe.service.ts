import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  /* PRIVATE: Avoiding to access the array from outside directly */
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super tasty Schnitzel, just awesome',
      'https://somuchfoodblog.com/wp-content/uploads/2019/02/c43ac-porkschnitzel1-e1587916004737-scaled.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Cheeseburger-3d7c922.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    /* with slice actually we're returning a copy of the recipes array */
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngrediendToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
