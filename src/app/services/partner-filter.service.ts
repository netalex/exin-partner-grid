import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartnerFilterService {
    // BehaviorSubject to store the current filter state
    private readonly levelFilterSubject = new BehaviorSubject<number | null>(null);

      // Observable that components can subscribe to
  public levelFilter$ = this.levelFilterSubject.asObservable();

  constructor() { }

  // setter to update the filter
  setLevelFilter(levelId: number | null) {
    this.levelFilterSubject.next(levelId);
  }

}
