import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {Cliente} from "../models/cliente";
import {DialogdeleteComponent} from "../Common/dialogdelete/dialogdelete.component";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst: any;
  public columnas: string [] = ['id', 'nombre', 'Acciones'];
  readonly width: string = '600';

  constructor(private apiCliente: ApiclienteService,
              public dialog: MatDialog,
              public snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.apiCliente.getClientes().subscribe( response => {
      this.lst = response.data;
      //console.log(this.lst);
    } );
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  delete(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogdeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCliente.delete(cliente.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackbar.open('Cliente eleminado con exito', '', {
              duration: 2000,
            })
            this.getClientes();
          }
        })
      }
    });
  }
}
