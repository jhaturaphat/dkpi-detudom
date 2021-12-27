import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTemplateItemComponent } from './kpi-template-item.component';

describe('KpiTemplateItemComponent', () => {
  let component: KpiTemplateItemComponent;
  let fixture: ComponentFixture<KpiTemplateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTemplateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiTemplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
