import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    // Subject subscription for recipes array changes
    this.recipeSubscription =
      this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
