import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SparepartServiceService {
  readonly url = 'http://localhost:3000/spareparts';

  constructor(private http: HttpClient) {}

  getAllSpareParts() {
    return this.http.get(this.url);
  }

  addSparepart(item: any) {
    return this.http.post(this.url, item);
  }

  editSparepart(id: any, item: any) {
    return this.http.patch(this.url + '/' + id, item);
  }

  deleteSparepart(id: any) {
    return this.http.delete(this.url + '/' + id);
  }
}
