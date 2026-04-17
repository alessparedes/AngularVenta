import { Component, OnInit } from '@angular/core';
import {ApiauthService} from "../services/apiauth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  constructor(public apiauth: ApiauthService, private router: Router) {
    if (this.apiauth.usuarioData) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.apiauth.login(this.email, this.password).subscribe(response =>
    {
      if (response.exito === 1) {
        this.router.navigate(['/']);
      }
      console.log(response);
    })
  }
}
