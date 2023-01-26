import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent
  implements OnInit, OnDestroy
{
  editIndexSubscription: Subscription;

  addForm: FormGroup;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // addForm creating
    this.addForm = this.fb.group({
      name: [null, Validators.required],
      amount: [
        null,
        [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')
        ]
      ]
    });

    // listen to edit index
    this.editIndexSubscription =
      this.shoppingListService.startedEdit.subscribe(
        (editIndex: number) => {
          this.editedItemIndex = editIndex;
          this.editMode = true;

          // get edited Item
          this.editedItem =
            this.shoppingListService.getIngredient(
              editIndex
            );

          // set addForm according to editedItem
          this.addForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.editIndexSubscription.unsubscribe();
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.addForm.value.name,
      this.addForm.value.amount
    );

    if (this.editMode) {
      // if edit mode on just update the ingredient
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      // else add the new ingredient
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.addForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(
      this.editedItemIndex
    );
    this.editMode = false;
    this.addForm.reset();
  }
}
