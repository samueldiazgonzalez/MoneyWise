import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/service/storage';
import { TransaccionService } from '../../core/service/transaccion';
import { User } from '../../core/model/user';
import { Transaccion } from '../../core/model/transaccion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  // Información del usuario
  nombreUsuario: string = '';
  emailUsuario: string = '';
  telefono: string = '';
  fechaRegistro: string = '';

  // Estadísticas
  totalIngresos: number = 0;
  totalGastos: number = 0;

  // Transacciones recientes
  transaccionesRecientes: any[] = [];

  constructor(
    private storage: StorageService,
    private transaccionService: TransaccionService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.cargarDatosUsuario();
    await this.cargarEstadisticas();
    await this.cargarTransaccionesRecientes();
  }

  // Cargar información del usuario
  async cargarDatosUsuario() {
    const session = this.storage.get('session');
    
    if (session) {
      this.nombreUsuario = session.nombre || 'Usuario';
      this.emailUsuario = session.email || 'correo@ejemplo.com';
      this.telefono = session.telefono || '';
      
      // Calcular fecha de registro (simulada)
      const fecha = new Date();
      this.fechaRegistro = fecha.toLocaleDateString('es-CO', { month: 'short', year: 'numeric' });
    }
  }

  // Cargar estadísticas
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

  // Cargar transacciones recientes (últimas 5)
  async cargarTransaccionesRecientes() {
    let transacciones: Transaccion[] = 
      await this.transaccionService.getTransaccionesUsuario() || [];

    // Ordenar por fecha descendente y tomar las últimas 5
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

  // Cerrar sesión
  logout() {
    this.storage.remove('session');
    this.router.navigate(['/auth/login']);
  }

}