import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOesComponent } from './users-oes.component';

describe('UsersOesComponent', () => {
  let component: UsersOesComponent;
  let fixture: ComponentFixture<UsersOesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersOesComponent]
    });
    fixture = TestBed.createComponent(UsersOesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
