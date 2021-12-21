import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamekpiComponent } from './namekpi.component';

describe('NamekpiComponent', () => {
  let component: NamekpiComponent;
  let fixture: ComponentFixture<NamekpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamekpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamekpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
