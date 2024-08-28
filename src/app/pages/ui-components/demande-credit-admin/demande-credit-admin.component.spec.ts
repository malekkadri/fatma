import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCreditAdminComponent } from './demande-credit-admin.component';

describe('DemandeCreditAdminComponent', () => {
  let component: DemandeCreditAdminComponent;
  let fixture: ComponentFixture<DemandeCreditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeCreditAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeCreditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
