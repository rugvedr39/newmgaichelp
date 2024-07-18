import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelDataComponent } from './level-data.component';

describe('LevelDataComponent', () => {
  let component: LevelDataComponent;
  let fixture: ComponentFixture<LevelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelDataComponent]
    });
    fixture = TestBed.createComponent(LevelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
