import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavtableComponent } from './favtable.component';

describe('FavtableComponent', () => {
  let component: FavtableComponent;
  let fixture: ComponentFixture<FavtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
