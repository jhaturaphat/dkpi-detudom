import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTemplateComponent } from './kpi-template.component';

describe('KpiTemplateComponent', () => {
  let component: KpiTemplateComponent;
  let fixture: ComponentFixture<KpiTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
