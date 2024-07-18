import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmfComponent } from './pmf.component';

describe('PmfComponent', () => {
  let component: PmfComponent;
  let fixture: ComponentFixture<PmfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmfComponent]
    });
    fixture = TestBed.createComponent(PmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
