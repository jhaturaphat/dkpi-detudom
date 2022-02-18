import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Chart from 'chart.js/auto';
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ChartService {

    constructor(
    private http: HttpClient
    ) {}
    
    url = environment.apiUrl+'/kpi';

    findChart(id:any, year:any){
        return lastValueFrom(this.http.get(this.url+'/chart/'+id+'/'+year)) as Promise<any[]>;
    }


    LineChart(title:any, label:string[], data:number[], ctx:any){                
        return new Chart(ctx, {
            type: 'line',
            data: {
              labels: label,
              datasets: [{ 
                  data: data,
                  label: "คะแนน",
                  borderColor: "#3e95cd",
                  fill: false
                }
              ]
            },
            options: {
              plugins: {
                title: {
                    display: true,
                    text: title
                }
              }
            }
          });
    }
} 