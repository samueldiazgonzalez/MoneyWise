import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransaccionService } from '../../../core/service/transaccion';
import { Transaccion } from '../../../core/model/transaccion';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-transaccion',
  templateUrl: './form-transaccion.page.html',
  styleUrls: ['./form-transaccion.page.scss'],
  standalone: false
})
export class FormTransaccionPage {

  // ── Propiedades ──────────────────────────────
  tipo: 'ingreso' | 'gasto' = 'gasto';
  categoria: string = '';
  monto: number = 0;
  descripcion: string = '';
  comprobante: string = '';
  idEditar: string | null = null;

  categorias: string[] = [
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

  // ── Lifecycle ────────────────────────────────
  async ngOnInit() {
    this.idEditar = this.route.snapshot.paramMap.get('id');

    if (this.idEditar) {
      const transacciones = await this.transaccionService.getTransaccionesUsuario();
      const t = transacciones.find((x: any) => x.id === this.idEditar);

      if (t) {
        this.tipo       = t.tipo;
        this.categoria  = t.categoria;
        this.monto      = t.monto;
        this.descripcion = t.descripcion;
        this.comprobante = t.comprobante;
      }
    }
  }

  // ── Métodos públicos ─────────────────────────
  async guardar() {
    if (!this.tipo) {
      await this.mostrarToast('Selecciona un tipo de transacción', 'warning');
      return;
    }
    if (!this.categoria) {
      await this.mostrarToast('Selecciona una categoría', 'warning');
      return;
    }
    if (!this.monto || this.monto <= 0 || isNaN(this.monto)) {
      await this.mostrarToast('Ingresa un monto válido mayor a 0', 'warning');
      return;
    }
    if (this.monto > 9999999) {
      await this.mostrarToast('El monto parece demasiado alto, verifica', 'warning');
      return;
    }

    try {
      const transaccion = new Transaccion(
        this.idEditar || Date.now().toString(),
        this.tipo,
        this.categoria,
        new Date(),
        this.monto,
        this.descripcion,
        this.comprobante
      );

      if (this.idEditar) {
        await this.transaccionService.actualizarTransaccion(transaccion);
        await this.mostrarToast('Transacción actualizada ✓', 'success');
      } else {
        await this.transaccionService.guardarTransaccion(transaccion);
        await this.mostrarToast('Transacción guardada ✓', 'success');
      }

      // Limpiar formulario
      this.categoria   = '';
      this.monto       = 0;
      this.descripcion = '';
      this.comprobante = '';

      this.router.navigate(['/tabs/transacciones']);

    } catch (error) {
      console.error('Error al guardar:', error);
      await this.mostrarToast('Ocurrió un error al guardar. Intenta de nuevo.', 'danger');
    }
  }

  async tomarFoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      if (photo.dataUrl) {
        this.comprobante = photo.dataUrl;
      }
    } catch (error) {
      // Usuario canceló la cámara, no es un error real
      console.log('Cámara cancelada o error:', error);
    }
  }

  // ── Métodos privados ─────────────────────────
  private async mostrarToast(mensaje: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2500;
    toast.color = color;
    toast.position = 'top';
    document.body.appendChild(toast);
    await toast.present();
  }

}