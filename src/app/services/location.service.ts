import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly url = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  getAllLocations() {
    return this.http.get(this.url);
  }
}
