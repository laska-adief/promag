import { Component, OnInit } from '@angular/core';
import { AssetServiceService } from 'src/app/services/asset-service.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  data: string = 'asset';
  columns: any = [];
  dataSource: any;
  displayedColumns = [];
  locations: any = [];
  buttonAddText = 'Add Asset';
  isDisplayAddButton: boolean = true;

  constructor(
    private assetService: AssetServiceService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe({
      next: (res) => {
        if (res) {
          this.locations = res;
          this.configureDataAsset();
          this.getAllDataAsset();
        }
      },
      error: (err) => console.log(err),
    });
  }

  configureDataAsset() {
    this.columns = [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: any) => `${element.id}`,
      },
      {
        columnDef: 'name',
        header: 'Asset name',
        cell: (element: any) => `${element.name}`,
      },
      {
        columnDef: 'serialNumber',
        header: 'Serial number',
        cell: (element: any) => `${element.serialNumber}`,
      },
      {
        columnDef: 'type',
        header: 'Type',
        cell: (element: any) => `${element.type}`,
      },
      {
        columnDef: 'location',
        header: 'Location',
        cell: (element: any) => `${element.location}`,
      },
      {
        columnDef: 'modelNumber',
        header: 'Model Number',
        cell: (element: any) => `${element.modelNumber}`,
      },
      {
        columnDef: 'manufacturer',
        header: 'Manufacturer',
        cell: (element: any) => `${element.manufacturer}`,
      },
      {
        columnDef: 'status',
        header: 'Current status',
        cell: (element: any) => `${element.status}`,
      },
    ];
    this.dataSource = [];
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

  getAllDataAsset() {
    this.assetService.getAllAssets().subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          console.log(this.locations);
          res.map((el: any) => {
            const foundLocation = this.locations.find(
              (loc: any) => loc.locationId === el.location_id
            );
            return (el['location'] = foundLocation?.name);
          });

          this.dataSource = res;
        }
      },
      error: (err) => console.log(err),
    });
  }

  onAddAsset(itemValue: any) {
    console.log('payload', itemValue);
    const payload = {
      id: itemValue.id,
      name: itemValue.name,
      type: itemValue.type,
      serialNumber: itemValue.serialNumber,
      location_id: itemValue.location_id,
      modelNumber: itemValue.modelNumber,
      manufacturer: itemValue.manufacturer,
      status: itemValue.status,
      url_photo: itemValue.url_photo,
    };
    this.assetService.addAsset(payload).subscribe({
      next: (res) => {
        console.log('data added', res);
        this.getAllDataAsset();
      },
      error: (err) => console.log('error', err),
    });
  }

  onEditAsset(itemValue: any) {
    console.log('payloadEdit', itemValue);
    const payload = {
      name: itemValue.name,
      type: itemValue.type,
      serialNumber: itemValue.serialNumber,
      location_id: itemValue.location_id,
      modelNumber: itemValue.modelNumber,
      manufacturer: itemValue.manufacturer,
      status: itemValue.status,
      url_photo: itemValue.url_photo,
    };
    this.assetService.editAsset(itemValue.id, payload).subscribe({
      next: (res) => {
        console.log('data edited', res);
        this.getAllDataAsset();
      },
      error: (err) => console.log('error', err),
    });
  }

  onDeleteAsset(id: string) {
    console.log('deleted id asset', id);
    this.assetService.deleteAsset(id).subscribe({
      next: (res) => {
        console.log('data deleted', res);
        this.getAllDataAsset();
      },
      error: (err) => console.log('error', err),
    });
  }
}
