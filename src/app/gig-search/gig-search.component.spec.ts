import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigSearchComponent } from './gig-search.component';

describe('GigSearchComponent', () => {
  let component: GigSearchComponent;
  let fixture: ComponentFixture<GigSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
