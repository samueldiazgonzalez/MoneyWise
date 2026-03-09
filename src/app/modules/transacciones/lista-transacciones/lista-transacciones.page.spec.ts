import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTransaccionesPage } from './lista-transacciones.page';

describe('ListaTransaccionesPage', () => {
  let component: ListaTransaccionesPage;
  let fixture: ComponentFixture<ListaTransaccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTransaccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
