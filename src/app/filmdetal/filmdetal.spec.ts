import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filmdetal } from './filmdetal';

describe('Filmdetal', () => {
  let component: Filmdetal;
  let fixture: ComponentFixture<Filmdetal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filmdetal],
    }).compileComponents();

    fixture = TestBed.createComponent(Filmdetal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
