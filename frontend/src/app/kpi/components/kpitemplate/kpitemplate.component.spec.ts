import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpitemplateComponent } from './kpitemplate.component';

describe('KpitemplateComponent', () => {
  let component: KpitemplateComponent;
  let fixture: ComponentFixture<KpitemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpitemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpitemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
