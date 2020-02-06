import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDisplayComponent } from './friends-display.component';

describe('FriendsDisplayComponent', () => {
  let component: FriendsDisplayComponent;
  let fixture: ComponentFixture<FriendsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
