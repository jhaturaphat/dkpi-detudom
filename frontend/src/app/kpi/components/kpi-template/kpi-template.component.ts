import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';

@Component({
  selector: 'app-kpi-template',
  templateUrl: './kpi-template.component.html',
  styleUrls: ['./kpi-template.component.css']
})
export class KpiTemplateComponent implements OnInit {

  constructor(
    private IndicatorService:IndicatorService,
    private ItemKpiService:ItemsKpiService,
    private alert:AlertService
  ) { }

  nameKpi:any = "";
  freq_store:any = '';
  depCare:any = '';

  ngOnInit(): void {
    this.loadIndicator();
  }

  loadIndicator():void{
    // ดึงข้อมูลชื่อตัวชี้วัด
    this.IndicatorService.onNameAll().then(result=>{
      console.log(result);      
      this.nameKpi = result
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.erros.sqlMessage);
    });
    // ดึงข้อมูลความถี่ในการจัดเก็บ
    this.ItemKpiService.onFindAllFreqStore().then(result=>{
      this.freq_store = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.erros.sqlMessage);
    });

    // ดึงข้อมูลผู้รับผิดชอบ
    this.ItemKpiService.findAllDepCare().then(result=>{
      this.depCare = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.erros.sqlMessage);
    });
  }

}
