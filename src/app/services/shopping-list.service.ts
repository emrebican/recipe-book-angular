import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  /* We have to inform our component that new data is available --> using eventEmitter */
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Cucumbers', 10)
  ];

  constructor() {}

  getIngredients() {
    /* Copy of ingredients array with slice method */
    return this.ingredients.slice();
  }

  /* getting Ingredient we want to edit */
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  /* Ingrediet from ShoppingEdit */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /* Ingredients from a recipe */
  addIngredients(ingredients: Ingredient[]) {
    /* for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    } */

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(
    index: number,
    updatedIngredient: Ingredient
  ) {
    this.ingredients[index] = updatedIngredient;
    // let our Subject knows the changes
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    // let our Subject knows the changes
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
