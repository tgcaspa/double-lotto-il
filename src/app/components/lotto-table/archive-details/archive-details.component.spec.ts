import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoTableArchiveDetailsComponent } from './archive-details.component';

describe('LottoTableArchiveDetailsComponent', () => {
  let component: LottoTableArchiveDetailsComponent;
  let fixture: ComponentFixture<LottoTableArchiveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LottoTableArchiveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoTableArchiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
