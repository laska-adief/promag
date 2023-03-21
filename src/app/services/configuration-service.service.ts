import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationServiceService {
  readonly url = 'http://localhost:3000/configurations';

  constructor(private http: HttpClient) {}

  getAllConfigurations() {
    return this.http.get(this.url);
  }

  addConfiguration(item: any) {
    return this.http.post(this.url, item);
  }

  editConfiguration(id: any, item: any) {
    return this.http.patch(this.url + '/' + id, item);
  }

  deleteConfiguration(id: any) {
    return this.http.delete(this.url + '/' + id);
  }
}
