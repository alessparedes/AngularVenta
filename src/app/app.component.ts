import {Component, ViewChild} from '@angular/core';
import {Usuario} from "./models/usuario";
import {ApiauthService} from "./services/apiauth.service";
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @ViewChild('drawer') drawer!: MatDrawer;
  isExpanded: boolean = false;
  title = 'venta';
  usuario: Usuario | null = null;

  constructor(public apiauth: ApiauthService, private router: Router){
    this.apiauth.usuario.subscribe(res => {
      this.usuario = res;
      console.log('Cambio el objeto', this.usuario);
    });
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.apiauth.logout();
    this.router.navigate(['/login']);
  }
}
