import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeller } from './new-seller';

describe('NewSeller', () => {
  let component: NewSeller;
  let fixture: ComponentFixture<NewSeller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSeller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSeller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
