import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IKpiScoreItem } from '../interfaces/kpi.interface';

Chart.register(ChartDataLabels);
Chart.register(annotationPlugin);
@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl + '/kpi';

  findChart(id: any, year: any) {
    return lastValueFrom(
      this.http.get(this.url + '/chart/' + id + '/' + year)
    ) as Promise<any[]>;
  }

  

  LineChart( itemsKpi: IKpiScoreItem,label: string[],data: number[], ctx: any, target_score?: string ) {
    let line_enabel:boolean = false;
    if(target_score) line_enabel = true;
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {            
            data: data,            
            label: '' + itemsKpi.year_th,            
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
            text: itemsKpi.idt_name_th + '  ' + itemsKpi.year_th,
          },
          subtitle: {
            display: true,
            text: itemsKpi.idn_name_th,
          }, 
          annotation: {
            annotations: {
              line1: {
                display:line_enabel,                
                type: 'line',
                yMin: target_score,
                yMax: target_score,
                borderColor: 'rgb(0, 255, 128)',
                borderWidth: 2,
                label:{ 
                  enabled:true,                 
                  content:target_score,
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

// https://www.chartjs.org
// https://v2_0_0--chartjs-plugin-datalabels.netlify.app
// https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/#installation