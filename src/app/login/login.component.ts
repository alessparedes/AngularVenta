import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiauthService} from "../services/apiauth.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  constructor(public apiauth: ApiauthService) { }

  ngOnInit(): void {
  }

  login() {
    this.apiauth.login(this.email, this.password).subscribe(Response =>
    {
      console.log(Response);
    })
  }
}
