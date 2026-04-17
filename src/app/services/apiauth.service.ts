import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Response} from "../models/response";
import {Usuario} from "../models/usuario";

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

  url: string = "https://localhost:7008/api/User/Login"; //environment.apiUrl;
  private usuarioSubject: BehaviorSubject<Usuario | null>;
  public get usuarioData(): Usuario | null { return this.usuarioSubject.value; }

  constructor(private _http: HttpClient) {
    const usuarioLocal = localStorage.getItem('usuario');
    this.usuarioSubject = new BehaviorSubject<Usuario | null>(usuarioLocal ? JSON.parse(usuarioLocal) : null);
  }

  login(email: string, password: string): Observable<Response> {
    return this._http.post<Response>(this.url, { email, password }, httpOption)
      .pipe(
        map(res => {
          if (res.exito === 1) {
            const user: Usuario = res.data;
            localStorage.setItem('usuario', JSON.stringify(user));
            this.usuarioSubject.next(user);
          }
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
