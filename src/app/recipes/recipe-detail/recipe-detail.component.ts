import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    /* With this observable method we can react any changes route params */
    this.route.params.subscribe((params: Params) => {
      /* get id / index from URL */
      this.id = +params['id'];
      /* So we can get recipe with this id / index */
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    /* pass the ingredients of a recipe to recipe  service */
    this.recipeService.addIngrediendToShoppingList(
      this.recipeDetail.ingredients
    );
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
}
