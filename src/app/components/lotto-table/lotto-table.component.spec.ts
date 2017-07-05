import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoTableComponent } from './lotto-table.component';

describe('LottoTableComponent', () => {
  let component: LottoTableComponent;
  let fixture: ComponentFixture<LottoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
