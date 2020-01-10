import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoTableFormBuilderComponent } from './form-builder.component';

describe('LottoTableFormBuilderComponent', () => {
  let component: LottoTableFormBuilderComponent;
  let fixture: ComponentFixture<LottoTableFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottoTableFormBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoTableFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
