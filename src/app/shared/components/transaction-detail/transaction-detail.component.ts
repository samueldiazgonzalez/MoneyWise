import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from 'src/app/core/models/transaccion';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  standalone: false,
})
export class TransactionDetailComponent {

  @Input() transaccion!: Transaccion;

  constructor(private modalCtrl: ModalController) {}

  cerrar(){
    this.modalCtrl.dismiss();
  }

}