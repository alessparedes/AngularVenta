import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiventaService} from "../../../services/apiventa.service";
import {Venta} from "../../../models/venta";
import {Concepto} from "../../../models/concepto";

@Component({
  selector: 'app-dialogventa',
  templateUrl: './dialogventa.component.html',
  styleUrls: ['./dialogventa.component.scss']
})
export class DialogventaComponent implements OnInit {

  public venta: Venta;
  public conceptos: Concepto[];

  public conceptoForm = this.formBuilder.nonNullable.group({
    cantidad: [0, Validators.required],
    importe: [0, Validators.required],
    idProducto: [1, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogventaComponent>,
    public snackbar: MatSnackBar,
    public formBuilder: FormBuilder,
    public apiVenta: ApiventaService
  ) {
    this.conceptos = [];
    this.venta = { idCliente: 3, conceptos: []};
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  addConcepto() {
    const value = this.conceptoForm.value;
    this.conceptos.push({
      cantidad: value.cantidad!,
      importe: value.importe!,
      idProducto: value.idProducto!
    });
  }

  addVenta() {
    this.venta.conceptos = this.conceptos;
    this.apiVenta.add(this.venta).subscribe(response => {
      if (response.exito === 1) {
        this.dialogRef.close();
        this.snackbar.open('Venta hecha con éxito','',{
          duration: 2000
        });
      }
    });
  }
}
