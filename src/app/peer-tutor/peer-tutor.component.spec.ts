import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerTutorComponent } from './peer-tutor.component';

describe('PeerTutorComponent', () => {
  let component: PeerTutorComponent;
  let fixture: ComponentFixture<PeerTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeerTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
