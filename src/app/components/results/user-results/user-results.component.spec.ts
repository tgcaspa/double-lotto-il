import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultsComponent } from './user-results.component';

describe('UserResultsComponent', () => {
  let component: UserResultsComponent;
  let fixture: ComponentFixture<UserResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
