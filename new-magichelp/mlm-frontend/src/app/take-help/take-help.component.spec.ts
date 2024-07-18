import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeHelpComponent } from './take-help.component';

describe('TakeHelpComponent', () => {
  let component: TakeHelpComponent;
  let fixture: ComponentFixture<TakeHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeHelpComponent]
    });
    fixture = TestBed.createComponent(TakeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
