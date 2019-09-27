import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistGigsComponent } from './artist-gigs.component';

describe('ArtistGigsComponent', () => {
  let component: ArtistGigsComponent;
  let fixture: ComponentFixture<ArtistGigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistGigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
