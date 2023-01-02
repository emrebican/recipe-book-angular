import { Component, Input } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe!: Recipe;

  constructor(private recipeService: RecipeService) {}

  onSelected() {
    /* With event-emitter we'll pass the selected recipe to recipeService */
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
