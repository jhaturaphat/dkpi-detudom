import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IKpiScoreItem } from '../interfaces/kpi.interface';

@Injectable({
  providedIn: 'root',
})
export class KeepScoreService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/keep';

  findOne(year:any,  depcare_id?:any){
    return lastValueFrom(this.http.get(this.url+'/score/'+year+'/'+depcare_id)) as Promise<IKpiScoreItem[]>
  }
}
