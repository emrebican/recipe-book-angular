import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    // We're using PUT instead of POST because we'll owerwrite all data(Array) to the old Array
    return this.http.put(
      'https://recipe-app-6675a-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-app-6675a-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients
                ? recipe.ingredients
                : []
            };
          });
        }),
        tap((recipesData) => {
          this.recipeService.setRecipes(recipesData);
        })
      );
  }
}
