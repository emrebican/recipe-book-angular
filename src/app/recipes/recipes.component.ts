import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeDetail: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    /* get the data received with event-emitter, from service */
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeDetail = recipe;
    });
  }
}
