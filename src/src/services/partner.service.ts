import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partners } from './models/partners';
import { PartnerDetail } from './models/partner-detail';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private baseUrl = 'https://mrkt-dsk.dev.exin.digital/api/v2/desk/partners/fideuram'
  private year:string = '2025'

  constructor(private http: HttpClient) { }

  getPartners(): Observable<Partners> {
    const yearpart = this.year;
    return this.http.get<Partners>(`${this.baseUrl}/${yearpart}`);
  }

  getPartnerDetail(id: number): Observable<PartnerDetail> {
    return this.http.get<PartnerDetail>(`${this.baseUrl}/detail/${id}`);
  }
}
