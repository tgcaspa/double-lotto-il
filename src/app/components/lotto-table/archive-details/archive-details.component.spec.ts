import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLotteryIdComponent } from './archive-details.component';

describe('SelectLotteryIdComponent', () => {
  let component: SelectLotteryIdComponent;
  let fixture: ComponentFixture<SelectLotteryIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLotteryIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLotteryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
