import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTransaccionPage } from './form-transaccion.page';

describe('FormTransaccionPage', () => {
  let component: FormTransaccionPage;
  let fixture: ComponentFixture<FormTransaccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTransaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
