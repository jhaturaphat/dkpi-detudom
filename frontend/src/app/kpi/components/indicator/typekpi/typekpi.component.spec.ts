import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypekpiComponent } from './typekpi.component';

describe('TypekpiComponent', () => {
  let component: TypekpiComponent;
  let fixture: ComponentFixture<TypekpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypekpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypekpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
