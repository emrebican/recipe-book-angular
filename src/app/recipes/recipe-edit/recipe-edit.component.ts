import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  regex = /^[1-9]+[0-9]*$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      /* Checking if We've an id in URL */
      this.editMode = params['id'] ? true : false;

      // We should call initForm, whenever the route params change
      // Because that indicates, we reloaded the page
      this.initForm();
    });
  }

  onSubmit() {
    // store recipe from Form
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imageURL,
      this.recipeForm.value.ingredients
    );

    // update a recipe or add new recipe
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // get Ingredients in a recipe
    if (this.editMode) {
      // get Selected Recipe
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImageURL = recipe.imageUrl;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            /* new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            }) */
            this.fb.group({
              name: this.fb.control(
                ingredient.name,
                Validators.required
              ),
              amount: this.fb.control(ingredient.amount, [
                Validators.required,
                Validators.pattern(this.regex)
              ])
            })
          );
        }
      }
    }

    /* this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageURL: new FormControl(recipeImageURL),
      description: new FormControl(recipeDescription)
    }); */

    // with FormBuilder
    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imageURL: [recipeImageURL, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients
    });
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    /* (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required)
      })
    ); */

    (this.recipeForm.get('ingredients') as FormArray).push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [
          null,
          [Validators.required, Validators.pattern(this.regex)]
        ]
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
