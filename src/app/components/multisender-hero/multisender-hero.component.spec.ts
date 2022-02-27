import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisenderHeroComponent } from './multisender-hero.component';

describe('MultisenderHeroComponent', () => {
  let component: MultisenderHeroComponent;
  let fixture: ComponentFixture<MultisenderHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultisenderHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultisenderHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
