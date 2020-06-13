import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownVotesComponent } from './down-votes.component';

describe('DownVotesComponent', () => {
  let component: DownVotesComponent;
  let fixture: ComponentFixture<DownVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
