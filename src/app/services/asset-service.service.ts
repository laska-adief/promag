import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetServiceService {
  readonly url = 'http://localhost:3000/assets';

  constructor(private http: HttpClient) {}

  getAllAssets() {
    return this.http.get(this.url);
  }

  addAsset(item: any) {
    return this.http.post(this.url, item);
  }

  editAsset(id: any, item: any) {
    return this.http.patch(this.url + '/' + id, item);
  }

  deleteAsset(id: any) {
    return this.http.delete(this.url + '/' + id);
  }
}
