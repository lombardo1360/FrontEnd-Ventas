import { Component } from "@angular/core";
import { FormArrayName, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Concepto } from "src/app/models/concepto";
import { Producto } from "src/app/models/producto";
import { Venta } from "src/app/models/venta";
import { ApiproductoService } from "src/app/services/apiproducto.service";
import { ApiventaService } from "src/app/services/apiventa.service";


@Component({
  templateUrl: 'dialogventa.component.html'
})
export class DialogVentaComponent{

  public venta!: Venta;
  public conceptos!: Concepto[];


  public conceptoForm = this.formBuilder.group({
      cantidad: [0, Validators.required],
      importe: [0, Validators.required],
      producto: [1, Validators.required]
  })

  constructor( public dialogRef: MatDialogRef<DialogVentaComponent>,
                public snackBar: MatSnackBar,
                private formBuilder: FormBuilder,
                public apiVenta: ApiventaService,
  ){
    this.conceptos = [];
    this.venta = {idCliente:1, conceptos: this.conceptos}
  }

  ngOnInit(): void {

  }


  close(){
    this.dialogRef.close();

  }

  addConcepto(){
    this.conceptos.push(this.conceptoForm.value)
    console.log(this.conceptos)
  }

  addVenta(){
    this.venta.conceptos = this.conceptos;
    console.log(this.venta)
    if(this.venta.conceptos !== null){
        this.apiVenta.add(this.venta).subscribe(response=>{
          console.log(response.mensaje);
          if(response.exito === 1){
            console.log(response.data);
            console.log("probando");
            this.dialogRef.close();
            this.snackBar.open("Venta hecha con exito", "", {duration: 2000});
          }

          else{
            this.snackBar.open(response.mensaje, "", {duration: 2000

            });
          }
        })
    }
    else{
      this.snackBar.open("Debe agregar conceptos", "", {duration: 2000

      });
    }
  }

}
