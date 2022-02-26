import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMultisenderComponent } from './nft-multisender.component';

describe('NftMultisenderComponent', () => {
  let component: NftMultisenderComponent;
  let fixture: ComponentFixture<NftMultisenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftMultisenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMultisenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
