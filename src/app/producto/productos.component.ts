import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiproductoService } from '../services/apiproducto.service';
import { DialogproductoComponent } from './dialog/dialogproducto.component';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public lst!: any[];
  public columnas: string[] = ["id", "nombre", "precioUnitario", "costo", "actions"]
  readonly width:string = '300px';

  constructor(private apiProducto: ApiproductoService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar
        ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto() {
    this.apiProducto.getProducto().subscribe( response =>{
      this.lst = response.data;
  });
  }

  openaAdd(){
    const dialogRef = this.dialog.open(DialogproductoComponent, {
        width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getProducto();
    });
    }

  openEdit(producto: Producto){
      const dialogRef = this.dialog.open(DialogproductoComponent, {
          width: this.width,
          data: producto
      });
      dialogRef.afterClosed().subscribe(result =>{
        this.getProducto();
      });
  }

}


