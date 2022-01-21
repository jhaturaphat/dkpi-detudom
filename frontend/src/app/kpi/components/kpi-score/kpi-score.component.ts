import { Component, OnInit } from '@angular/core';
import { IKpiRangeYear } from 'src/app/shared/interfaces/kpi.interface';
import { KpiRangeYearService } from 'src/app/shared/services/kpiRangeYear.service';

@Component({
  selector: 'app-kpi-score',
  templateUrl: './kpi-score.component.html',
  styleUrls: ['./kpi-score.component.css']
})
export class KpiScoreComponent implements OnInit {

  constructor(
    private yearService:KpiRangeYearService
  ) { }

  year:IKpiRangeYear[] = []
  ngOnInit(): void {
    this.yearService.findAll().then(result => {
      this.year = result;
    })
  }

}
