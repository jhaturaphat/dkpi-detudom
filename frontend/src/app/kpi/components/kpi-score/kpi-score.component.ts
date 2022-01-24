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
  year_id:string = 'ปีงบประมาณ';
  ngOnInit(): void {
    this.yearService.findAll().then(result => {
      this.year = result;
    })
  }

  kpiSearchYear(item:IKpiRangeYear){
    this.year_id = item.year_id + 543;    
    
  }
}
