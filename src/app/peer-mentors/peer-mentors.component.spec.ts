import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerMentorsComponent } from './peer-mentors.component';

describe('PeerMentorsComponent', () => {
  let component: PeerMentorsComponent;
  let fixture: ComponentFixture<PeerMentorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerMentorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeerMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
