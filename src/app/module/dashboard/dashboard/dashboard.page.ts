import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransaccionService } from '../../../core/service/transaccion';
import { Transaccion } from '../../../core/model/transaccion';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/service/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit, AfterViewInit {

  saldo = 0;
  ingresos = 0;
  gastos = 0;

  chart: any;

  constructor(
    private transaccionService: TransaccionService,
    private storage: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.calcularResumen();
    this.crearGrafica();
  }

  async ngAfterViewInit() {
    await this.crearGrafica();
  }

  async calcularResumen(){
    let transacciones: Transaccion[] =
      await this.transaccionService.getTransaccionesUsuario() || [];

    this.ingresos = 0;
    this.gastos = 0;

    transacciones.forEach(t => {
      if(t.getTipo() === 'ingreso'){
        this.ingresos += t.getMonto();
      }

      if(t.getTipo() === 'gasto'){
        this.gastos += t.getMonto();
      }
    });

    this.saldo = this.ingresos - this.gastos;
  }

  async crearGrafica(){
    let data = await this.transaccionService.getTransaccionesUsuario() || [];
    let categorias: any = {};

    data.forEach((t:any)=>{
      if(t.getTipo() === 'gasto'){
        if(!categorias[t.getCategoria()]){
          categorias[t.getCategoria()] = 0;
        }
        categorias[t.getCategoria()] += t.getMonto();
      }
    });

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    if(this.chart){
      this.chart.destroy();
    }

    const coloresBancolombia = [
      '#FDDA24', // Amarillo
      '#1C1C1C', // Negro
      '#00D084', // Verde
      '#FF3B30', // Rojo
      '#007AFF', // Azul
      '#FF9500', // Naranja
      '#5856D6', // Morado
      '#34C759'  // Verde claro
    ];

    this.chart = new Chart("graficaPastel", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: valores,
          backgroundColor: coloresBancolombia,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13,
                weight: 'bold' as any
              },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#1C1C1C',
            titleColor: '#FDDA24',
            bodyColor: '#ffffff',
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context: any) {
                return ' $' + context.parsed.toLocaleString('es-CO');
              }
            }
          }
        }
      }
    });

    const canvas = document.getElementById('graficaPastel') as HTMLCanvasElement;
    if(canvas) canvas.classList.add('chart-rendered');
  }

  logout(){
    this.storage.remove('session');
    this.router.navigate(['/auth/login']);
  }

}