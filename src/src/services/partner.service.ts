import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partners } from './models/partners';
import { PartnerDetail } from './models/partner-detail';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly baseUrl = 'https://mrkt-dsk.dev.exin.digital/api/v2/desk/partners/fideuram'
  private readonly year:string = '2025'

  private readonly headers = new HttpHeaders({
    'Authorization': 'User 1',
    'Content-Type': 'application/json'
  });


  constructor(private readonly http: HttpClient) { }

  getPartners(): Observable<Partners> {
    const yearpart = this.year;
    return this.http.get<Partners>(`${this.baseUrl}/${yearpart}`, { headers: this.headers });
  }

  getPartnerDetail(id: number): Observable<PartnerDetail> {
    return this.http.get<PartnerDetail>(`${this.baseUrl}/detail/${id}`, { headers: this.headers });
  }
}
