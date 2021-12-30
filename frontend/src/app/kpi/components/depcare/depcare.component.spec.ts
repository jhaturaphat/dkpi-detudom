import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepcareComponent } from './depcare.component';

describe('DepcareComponent', () => {
  let component: DepcareComponent;
  let fixture: ComponentFixture<DepcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepcareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
