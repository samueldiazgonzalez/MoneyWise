import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FilterBarComponent } from './component/filter-bar/filter-bar.component';

import { TransactionDetailComponent } from './component/transaction-detail/transaction-detail.component';
import { FilterByCategoryPipe } from './pipe/filter-by-category-pipe';
import { FilterByTypePipe } from './pipe/filter-by-type-pipe';
import { SearchByTextPipe } from './pipe/search-by-text-pipe';

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