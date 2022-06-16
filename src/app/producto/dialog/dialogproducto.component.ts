import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/models/producto';
import { ApiproductoService } from 'src/app/services/apiproducto.service';

@Component({
  selector: 'app-dialogproducto',
  templateUrl: './dialogproducto.component.html'
})
export class DialogproductoComponent implements OnInit {

  public nombre!: string;
  public precioUnitario!:number;
  public costo!:number;



  constructor(
      public dialogRef: MatDialogRef<DialogproductoComponent>,
      public apiProducto: ApiproductoService,
      public snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public producto: Producto
  ){
      if (this.producto !== null){
        this.nombre = producto.nombre;
        this.precioUnitario = producto.precioUnitario;
        this.costo = producto.costo;
      }
  }
  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  editProducto(){
    const producto: Producto = {nombre: this.nombre, id: this.producto.id, precioUnitario: this.precioUnitario, costo: this.costo};
    this.apiProducto.editProducto(producto).subscribe(response=>{
      if(response.exito ===1 ){
        this.dialogRef.close();
        this.snackBar.open("Producto editado con exito", '' ,{
            duration: 2000
        })
      }
  });
  }

  addProducto() {
    const producto: Producto = {nombre: this.nombre, id: 0, precioUnitario:this.precioUnitario, costo:this.costo};
    this.apiProducto.add(producto).subscribe(response=>{
        if(response.exito ===1 ){
          this.dialogRef.close();
          this.snackBar.open("Producto insertado con exito", '' ,{
              duration: 2000
          })
        }
    });
  }


}
