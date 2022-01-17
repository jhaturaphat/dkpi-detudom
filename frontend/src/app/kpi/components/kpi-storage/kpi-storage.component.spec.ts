import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiStorageComponent } from './kpi-storage.component';

describe('KpiStorageComponent', () => {
  let component: KpiStorageComponent;
  let fixture: ComponentFixture<KpiStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
