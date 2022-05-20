import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IKpiScoreItem } from '../interfaces/kpi.interface';

Chart.register(ChartDataLabels);
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

  LineChart(
    itemsKpi: IKpiScoreItem,
    label: string[],
    data: number[],
    ctx: any
  ) {
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
              display:true
            }, 
          },
          
        ],
      },      
      options: {        
        plugins: {          
          legend: { 
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: itemsKpi.idt_name_th + '  ' + itemsKpi.year_th,
          },
          subtitle: {
            display: true,
            text: itemsKpi.idn_name_th,
          },          
        },
        maintainAspectRatio: false,
        responsive: true,
      },      
    });
  }
}

// https://www.chartjs.org/
// https://v2_0_0--chartjs-plugin-datalabels.netlify.app/