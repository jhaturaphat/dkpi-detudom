import { AfterViewInit, Component } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(ChartDataLabels);
Chart.register(annotationPlugin);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor(
    private chart:ChartService
  ) { }

  totalTpl:any = [];

  ngAfterViewInit(): void {

    this.chart.findTotalTpl().then(result => {
      this.totalTpl = result;
    }).catch(err=>console.log(err))

    this.chart.topChartList().then(result => {
      this.loadChartList(result);
     }).catch(err =>{
       console.log(err); 
       return;    
     }); 
  }


  loadChartList(value:any){
    this.chart.topChart(new Date().getFullYear(), value).then(result=>{
       //สร้าง Chart  
       value.forEach((ele:any, index:number) => {
        let items = result.filter((e:any) => e.kpi_tpl_id == ele.kpi_tpl_id);
        let element = 'lineChartDemo'+(index+1);
        this.buildChart(element, items);
       });          
    }).catch(err=>console.log(err));
  }
  
  buildChart(ele:string, items:any){

    return new Chart(ele, {
      type: 'line',
      data: {     
        labels:items.map((e: any) => e.prefix),   
        datasets: [
          {            
            data: items.map((e: any) => e.score),            
            label: items[0].kpi_range_year_year_id,            
            fill: true,
            datalabels:{
              display:true,
              color:'#000'
            }, 
          },          
        ],
      },      
      options: {        
        plugins: {          
          legend: { 
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: items[0].iname,
          },
          subtitle: {
            display: true,
            text: '',
          }, 
          annotation: {
            annotations: {
              line1: {
                display:true,                
                type: 'line',
                yMin: items[0].target_score,
                yMax: items[0].target_score,
                borderColor: 'rgb(0, 255, 128)',
                borderWidth: 2,
                label:{ 
                  enabled:true,                 
                  content:items[0].target_score,
                  position:'center',
                  rotation:0,
                  color: 'blue',
                  backgroundColor: 'rgba(255, 255, 255, 0)'
                }
              }
            }
          }         
        },
        maintainAspectRatio: false,
        responsive: true,
      },         
    });
  }
}
