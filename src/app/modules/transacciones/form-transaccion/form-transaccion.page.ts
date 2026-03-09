import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-transaccion',
  templateUrl: './form-transaccion.page.html',
  styleUrls: ['./form-transaccion.page.scss'],
  standalone: false
})
export class FormTransaccionPage {



  tipo: 'ingreso' | 'gasto' = 'gasto';
  categoria: string = '';
  monto: number = 0;
  descripcion: string = '';
  comprobante: string = '';

  categorias:string[] = [
  'Ropa',
  'Alimentación',
  'Transporte',
  'Extras',
  'Otros'
];



  constructor(
    private transaccionService: TransaccionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

async guardar(){

  console.log("guardando transaccion");

  if(!this.categoria || !this.monto || this.monto <= 0){
    alert("Debe completar los campos correctamente");
    return;
  }

  const transaccion = new Transaccion(
    this.idEditar || Date.now().toString(),
    this.tipo,
    this.categoria,
    new Date(),
    this.monto,
    this.descripcion,
    this.comprobante
  );

  if(this.idEditar){

    await this.transaccionService.actualizarTransaccion(transaccion);

  }else{

    await this.transaccionService.guardarTransaccion(transaccion);

  }

  console.log("transaccion enviada", transaccion);

  // limpiar formulario
  this.categoria = '';
  this.monto = 0;
  this.descripcion = '';
  this.comprobante = '';

  this.router.navigate(['/tabs/transacciones']);

}
  async tomarFoto(){

  const photo = await Camera.getPhoto({
    quality: 80,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt
  });

  if(photo.dataUrl){
    this.comprobante = photo.dataUrl;
  }


}
idEditar: string | null = null;

async ngOnInit(){

  this.idEditar = this.route.snapshot.paramMap.get('id');

  if(this.idEditar){

    const transacciones =
      await this.transaccionService.getTransaccionesUsuario();

    const t = transacciones.find(
      (x:any)=> x.id === this.idEditar
    );

    if(t){

      this.tipo = t.tipo;
      this.categoria = t.categoria;
      this.monto = t.monto;
      this.descripcion = t.descripcion;
      this.comprobante = t.comprobante;

    }

  }

}


}