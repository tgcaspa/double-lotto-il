import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoSaveModalComponent } from './lotto-save-modal.component';

describe('LottoSaveModalComponent', () => {
  let component: LottoSaveModalComponent;
  let fixture: ComponentFixture<LottoSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottoSaveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
