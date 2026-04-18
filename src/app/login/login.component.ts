import { Component, OnInit } from '@angular/core';
import {ApiauthService} from "../services/apiauth.service";
import {Router} from "@angular/router";
import {Login} from "../models/login";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(public apiauth: ApiauthService, private router: Router
              , private formBuilder: FormBuilder ) {
    if (this.apiauth.usuarioData) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.apiauth.login(this.loginForm.getRawValue()).subscribe(response => {
        if (response.exito === 1) {
          this.router.navigate(['/']);
        }
        console.log(response);
      });
    }

  }
}
