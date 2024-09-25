import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilAnalysisComponent } from './soil-analysis.component';

describe('SoilAnalysisComponent', () => {
  let component: SoilAnalysisComponent;
  let fixture: ComponentFixture<SoilAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
