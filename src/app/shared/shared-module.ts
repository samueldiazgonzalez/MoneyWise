import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

import { FilterByTypePipe } from './pipes/filter-by-type-pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category-pipe';
import { SearchByTextPipe } from './pipes/search-by-text-pipe';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';

@NgModule({
  declarations: [
    FilterBarComponent,
    FilterByTypePipe,
    FilterByCategoryPipe,
    SearchByTextPipe,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FilterBarComponent,
    FilterByTypePipe,
    FilterByCategoryPipe,
    SearchByTextPipe,
    TransactionDetailComponent
  ]
})
export class SharedModule {}