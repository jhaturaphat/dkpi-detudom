import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepResponsibleComponent } from './dep-responsible.component';

describe('DepResponsibleComponent', () => {
  let component: DepResponsibleComponent;
  let fixture: ComponentFixture<DepResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
