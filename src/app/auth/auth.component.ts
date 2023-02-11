import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, I_AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  submittedForm: FormGroup;
  user = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.submittedForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.submittedForm.valid) {
      return;
    }

    const email = this.submittedForm.value.email;
    const password = this.submittedForm.value.password;

    // assigning the observable to a variable
    let authObs: Observable<I_AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    // then subscribe it for any if/else statement
    authObs.subscribe(
      (responseData) => {
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes'], {
          relativeTo: this.route
        });
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.submittedForm.reset();
  }
}
