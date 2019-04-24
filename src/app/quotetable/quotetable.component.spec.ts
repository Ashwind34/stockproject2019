import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotetableComponent } from './quotetable.component';

describe('QuotetableComponent', () => {
  let component: QuotetableComponent;
  let fixture: ComponentFixture<QuotetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
