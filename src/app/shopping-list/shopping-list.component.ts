import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    /* We need to reRender shopping-list component when we have a new ingredient */
    this.ingredientSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEdit.next(index);
  }
}
