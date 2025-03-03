import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Partners } from './models/partners';
import { PartnerDetail } from './models/partner-detail';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly baseUrl = 'https://mrkt-dsk.dev.exin.digital/api/v2/desk/partners/fideuram'
  private readonly year: string = '2025'
  private partnersCache$: Observable<Partners> | null = null;

  private readonly headers = new HttpHeaders({
    'Authorization': 'User 1',
    'Content-Type': 'application/json'
  });


  constructor(private readonly http: HttpClient) { }

  getPartners(): Observable<Partners> {
    // Use cached data if available
    if (this.partnersCache$) {
      return this.partnersCache$;
    }

    const yearpart = this.year;
    this.partnersCache$ = this.http.get<Partners>(
      `${this.baseUrl}/${yearpart}`,
      { headers: this.headers }
    ).pipe(
      shareReplay(1),
      catchError(error => {
        // Reset cache on error
        this.partnersCache$ = null;
        console.error('Error fetching partners data:', error);
        throw error;
      })
    );

    return this.partnersCache$;
  }

  getPartnerLevels(): Observable<any[]> {
    return this.getPartners().pipe(
      map(response => response?.partner_levels || []),
      map(levels => {
        const sortedLevels = [...levels]; // Create a copy
        sortedLevels.sort((a, b) => a.order - b.order);
        return sortedLevels;
      })
    );
  }

  getPartnerDetail(id: number): Observable<PartnerDetail> {
    return this.http.get<PartnerDetail>(
      `${this.baseUrl}/detail/${id}`,
      { headers: this.headers }
    );
  }
}
