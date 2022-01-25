import { Component, OnInit } from '@angular/core';
import { IKpiRangeYear, IKpiScore } from 'src/app/shared/interfaces/kpi.interface';
import { KpiRangeYearService } from 'src/app/shared/services/kpiRangeYear.service';
import { KpiScoreService } from 'src/app/shared/services/KpiScore.service'

@Component({
  selector: 'app-kpi-score',
  templateUrl: './kpi-score.component.html',
  styleUrls: ['./kpi-score.component.css']
})
export class KpiScoreComponent implements OnInit {

  constructor(
    private yearService:KpiRangeYearService,
    private scoreService:KpiScoreService
  ) { }

  year:IKpiRangeYear[] = []  
  year_id:string = 'ปีงบประมาณ';
  kpiScore:IKpiScore[] = [];
  ngOnInit(): void {
    this.yearService.findAll().then(result => {
      this.year = result;
    });

    const year = new Date(Date.now()).getFullYear().toString(); 
    this.kpiScoreYear(year);
  }


  kpiScoreYear(year?:string){
    this.scoreService.findAll(year).then(result=>{
      this.kpiScore = result;
    }).catch(err=>{
      console.log(err.error.errors);      
    })
  }

  kpiSearchYear(item:IKpiRangeYear){
    this.year_id = item.year_id + 543;    
    this.kpiScoreYear(item.year_id);
  }
}
