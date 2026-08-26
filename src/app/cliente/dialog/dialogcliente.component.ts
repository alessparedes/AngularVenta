import {Component, Inject} from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { Cliente } from "src/app/models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
  templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent{
  public nombre: string = "";

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
              public apiCliente: ApiclienteService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public cliente: Cliente ){
    if (this.cliente !== null) {
      this.nombre = cliente.nombre;
    }
  }

  close() {
    this.dialogRef.close();
  }

  editCliente() {
    const cliente = {nombre: this.nombre, id: this.cliente.id};
    this.apiCliente.edit(cliente).subscribe(response =>{
      if(response.exito === 1){
        this.dialogRef.close();
        this.snackBar.open('Cliente editado con éxito', '', {
          duration: 2000
        });
      }else{
        console.log(response);
      }
    });
  }

  addCliente() {
    const cliente: Cliente = { nombre: this.nombre, id: 0 }
    console.log(this.cliente);
    this.apiCliente.add(cliente).subscribe(response =>{
      if(response.exito === 1){
        this.dialogRef.close();
        this.snackBar.open('Cliente insertado con éxito', '', {
          duration: 2000
        });
      }else{
        console.log(response);
      }
    });
  }
}
