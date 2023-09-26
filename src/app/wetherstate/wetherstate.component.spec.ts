import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WetherstateComponent } from './wetherstate.component';

describe('WetherstateComponent', () => {
  let component: WetherstateComponent;
  let fixture: ComponentFixture<WetherstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WetherstateComponent]
    });
    fixture = TestBed.createComponent(WetherstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
