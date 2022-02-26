import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenMultisenderComponent } from './token-multisender.component';

describe('TokenMultisenderComponent', () => {
  let component: TokenMultisenderComponent;
  let fixture: ComponentFixture<TokenMultisenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenMultisenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenMultisenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
