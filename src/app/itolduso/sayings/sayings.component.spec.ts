import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SayingsComponent } from './sayings.component';

describe('SayingsComponent', () => {
  let component: SayingsComponent;
  let fixture: ComponentFixture<SayingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
