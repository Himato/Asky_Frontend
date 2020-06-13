import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpVotesComponent } from './up-votes.component';

describe('UpVotesComponent', () => {
  let component: UpVotesComponent;
  let fixture: ComponentFixture<UpVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
