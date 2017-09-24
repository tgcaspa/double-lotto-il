import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisResultComponent } from './pais-result.component';

describe('PaisResultComponent', () => {
  let component: PaisResultComponent;
  let fixture: ComponentFixture<PaisResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
