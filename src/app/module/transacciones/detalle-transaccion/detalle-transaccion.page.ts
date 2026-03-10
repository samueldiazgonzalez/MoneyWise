import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionService } from '../../../core/service/transaccion';
import { Transaccion } from '../../../core/model/transaccion';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false,
})
export class DetalleTransaccionPage implements OnInit {

  transaccion: Transaccion | null = null;

  // Propiedades expuestas al HTML
  tipo: string = '';
  categoria: string = '';
  fecha: Date = new Date();
  monto: number = 0;
  descripcion: string = '';
  comprobante: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transaccionService: TransaccionService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const todas = await this.transaccionService.getTransaccionesUsuario();
      this.transaccion = todas.find((t: any) => t.getId() === id) || null;

      if (this.transaccion) {
        this.tipo        = this.transaccion.getTipo();
        this.categoria   = this.transaccion.getCategoria();
        this.fecha       = this.transaccion.getFecha();
        this.monto       = this.transaccion.getMonto();
        this.descripcion = this.transaccion.getDescripcion();
        this.comprobante = this.transaccion.getComprobante();
      }
    }
  }

  editar() {
    if (this.transaccion) {
      this.router.navigate(['/tabs/editar', this.transaccion.getId()]);
    }
  }

  async eliminar() {
    if (!this.transaccion) return;

    const alert = document.createElement('ion-alert');
    alert.header = '¿Eliminar transacción?';
    alert.message = 'Esta acción no se puede deshacer.';
    alert.buttons = [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: async () => {
          await this.transaccionService.eliminarTransaccion(this.transaccion!.getId());
          await this.mostrarToast('Transacción eliminada', 'danger');
          this.router.navigate(['/tabs/transacciones']);
        }
      }
    ];
    document.body.appendChild(alert);
    await alert.present();
  }

  getIconoCategoria(categoria: string): string {
    const iconos: any = {
      'Ropa': 'shirt-outline',
      'Alimentación': 'fast-food-outline',
      'Transporte': 'car-outline',
      'Extras': 'sparkles-outline',
      'Otros': 'ellipsis-horizontal-outline'
    };
    return iconos[categoria] || 'pricetag-outline';
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2000;
    toast.color = color;
    toast.position = 'top';
    document.body.appendChild(toast);
    await toast.present();
  }

}