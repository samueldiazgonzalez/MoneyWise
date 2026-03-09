import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage';

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

  this.chart = new Chart("graficaPastel", {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: valores
      }]
    }
  });

}

  logout(){

    this.storage.remove('session');

    this.router.navigate(['/auth/login']);

  }

}