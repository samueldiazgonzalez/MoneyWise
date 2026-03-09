import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleTransaccionPage } from './detalle-transaccion.page';

describe('DetalleTransaccionPage', () => {
  let component: DetalleTransaccionPage;
  let fixture: ComponentFixture<DetalleTransaccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTransaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
