import { Component, OnInit } from '@angular/core';
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {DialogventaComponent} from "./dialog/dialogventa/dialogventa.component";

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  public readonly width: string = '600';
  public lst: any;
  public columnas: string [] = ['producto', 'cantidad', 'importe'];

  constructor(public dialog: MatDialog,
              public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogventaComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getVenta(){}

}
