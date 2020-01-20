import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartModule } from './chart.module'
import { ChartComponent } from './chart.component'

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartModule,
      ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
