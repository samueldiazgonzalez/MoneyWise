import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/service/storage';
import { TransaccionService } from '../../core/service/transaccion';
import { CameraService } from '../../core/service/camera';
import { ActionSheetController } from '@ionic/angular';
import { User } from '../../core/model/user';
import { Transaccion } from '../../core/model/transaccion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  nombreUsuario: string = '';
  emailUsuario: string = '';
  telefono: string = '';
  fechaRegistro: string = '';

  profilePhoto: string = '';

  totalIngresos: number = 0;
  totalGastos: number = 0;

  transaccionesRecientes: any[] = [];

  constructor(
    private storage: StorageService,
    private transaccionService: TransaccionService,
    private cameraService: CameraService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.cargarDatosUsuario();
    await this.cargarEstadisticas();
    await this.cargarTransaccionesRecientes();
  }

  async cargarDatosUsuario() {
    const session = this.storage.get('session');
    
    if (session) {
      this.nombreUsuario = session.nombre || 'Usuario';
      this.emailUsuario = session.email || 'correo@ejemplo.com';
      this.telefono = session.telefono || '';
      
      this.profilePhoto = session.profilePhoto || '';
      
      const fecha = new Date();
      this.fechaRegistro = fecha.toLocaleDateString('es-CO', { month: 'short', year: 'numeric' });
    }
  }

  async cargarEstadisticas() {
    let transacciones: Transaccion[] = 
      await this.transaccionService.getTransaccionesUsuario() || [];

    this.totalIngresos = 0;
    this.totalGastos = 0;

    transacciones.forEach(t => {
      if (t.getTipo() === 'ingreso') {
        this.totalIngresos += t.getMonto();
      }
      
      if (t.getTipo() === 'gasto') {
        this.totalGastos += t.getMonto();
      }
    });
  }

  async cargarTransaccionesRecientes() {
    let transacciones: Transaccion[] = 
      await this.transaccionService.getTransaccionesUsuario() || [];

    this.transaccionesRecientes = transacciones
      .sort((a, b) => {
        const fechaA = new Date(a.getFecha()).getTime();
        const fechaB = new Date(b.getFecha()).getTime();
        return fechaB - fechaA;
      })
      .slice(0, 5)
      .map(t => ({
        tipo: t.getTipo(),
        categoria: t.getCategoria(),
        monto: t.getMonto(),
        fecha: t.getFecha()
      }));
  }

  async changeProfilePhoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de perfil',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Seleccionar de galería',
          icon: 'images',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Eliminar foto',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.removePhoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async takePicture() {
    try {
      let photo = await this.cameraService.takePicture();
      
      if (photo) {
        photo = await this.cameraService.compressImage(photo, 0.7);
        
        photo = await this.cameraService.resizeImage(photo, 400, 400);
        
        this.saveProfilePhoto(photo);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  async selectFromGallery() {
    try {
      let photo = await this.cameraService.selectFromGallery();
      
      if (photo) {
        photo = await this.cameraService.compressImage(photo, 0.7);
        
        photo = await this.cameraService.resizeImage(photo, 400, 400);
      
        this.saveProfilePhoto(photo);
      }
    } catch (error) {
      console.error('Error al seleccionar foto:', error);
    }
  }
  saveProfilePhoto(photoBase64: string) {
  
    this.profilePhoto = photoBase64;

    const session = this.storage.get('session');
    if (session) {
      session.profilePhoto = photoBase64;
      this.storage.set('session', session);
      console.log('✅ Foto de perfil guardada');
    }
  }

  removePhoto() {
    this.profilePhoto = '';
    
    const session = this.storage.get('session');
    if (session) {
      session.profilePhoto = '';
      this.storage.set('session', session);
      console.log('🗑️ Foto de perfil eliminada');
    }
  }

  
  getPhotoUrl(): string {
    return this.profilePhoto || 'assets/icon/favicon.png';
  }

  logout() {
    this.storage.remove('session');
    this.router.navigate(['/auth/login']);
  }

}