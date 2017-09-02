import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareModalComponent } from './compare-modal.component';

describe('CompareModalComponent', () => {
  let component: CompareModalComponent;
  let fixture: ComponentFixture<CompareModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
