import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatListComponent } from './friends-chat-list.component';

describe('FriendsChatListComponent', () => {
  let component: FriendsChatListComponent;
  let fixture: ComponentFixture<FriendsChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
