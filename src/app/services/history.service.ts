import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  readonly url = 'http://localhost:3000/histories';

  constructor(private http: HttpClient) {}

  getAllHistories() {
    return this.http.get(this.url);
  }
}
