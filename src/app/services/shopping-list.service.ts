import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  /* We have to inform our component that new data is available --> using eventEmitter */
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Cucumbers', 10)
  ];

  constructor() {}

  getIngredients() {
    /* Copy of ingredients array with slice method */
    return this.ingredients.slice();
  }

  /* Ingrediet from ShoppingEdit */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  /* Ingredients from a recipe */
  addIngredients(ingredients: Ingredient[]) {
    /* for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    } */

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
