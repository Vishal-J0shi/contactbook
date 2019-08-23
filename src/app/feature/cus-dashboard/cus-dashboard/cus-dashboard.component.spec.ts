import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusDashboardComponent } from './cus-dashboard.component';

describe('CusDashboardComponent', () => {
  let component: CusDashboardComponent;
  let fixture: ComponentFixture<CusDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
