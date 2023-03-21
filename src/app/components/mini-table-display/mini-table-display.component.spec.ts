import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTableDisplayComponent } from './mini-table-display.component';

describe('MiniTableDisplayComponent', () => {
  let component: MiniTableDisplayComponent;
  let fixture: ComponentFixture<MiniTableDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniTableDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
