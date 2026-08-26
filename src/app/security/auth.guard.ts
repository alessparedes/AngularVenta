import  { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from "rxjs";
import {ApiauthService} from "../services/apiauth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private router: Router, private apiauthService: ApiauthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = this.apiauthService.usuarioData;
    if (usuario) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}

