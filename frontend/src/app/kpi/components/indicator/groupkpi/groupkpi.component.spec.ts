import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupkpiComponent } from './groupkpi.component';

describe('GroupkpiComponent', () => {
  let component: GroupkpiComponent;
  let fixture: ComponentFixture<GroupkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
