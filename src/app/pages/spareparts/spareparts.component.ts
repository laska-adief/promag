import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { SparepartServiceService } from 'src/app/services/sparepart-service.service';

@Component({
  selector: 'app-spareparts',
  templateUrl: './spareparts.component.html',
  styleUrls: ['./spareparts.component.scss'],
})
export class SparepartsComponent implements OnInit {
  data: string = 'sparepart';
  columns: any = [];
  dataSource: any;
  displayedColumns = [];
  locations: any = [];
  buttonAddText = 'Add Spareparts';
  isDisplayAddButton: boolean = true;

  constructor(
    private sparepartService: SparepartServiceService,
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
          this.getAllDataSpareparts();
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
        columnDef: 'quantity',
        header: 'Quantiity',
        cell: (element: any) => `${element.quantity}`,
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

  getAllDataSpareparts() {
    this.sparepartService.getAllSpareParts().subscribe({
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

  onAddSparepart(itemValue: any) {
    console.log('payload', itemValue);
    const payload = {
      id: itemValue.id,
      name: itemValue.name,
      type: itemValue.type,
      modelNumber: itemValue.modelNumber,
      manufacturer: itemValue.manufacturer,
      quantity: itemValue.quantity,
      location_id: itemValue.location_id,
      status: itemValue.status,
      url_photo: itemValue.url_photo,
    };
    this.sparepartService.addSparepart(payload).subscribe({
      next: (res) => {
        console.log('data added', res);
        this.getAllDataSpareparts();
      },
      error: (err) => console.log('error', err),
    });
  }

  onEditSparepart(itemValue: any) {
    console.log('payloadEdit', itemValue);
    const payload = {
      name: itemValue.name,
      type: itemValue.type,
      quantity: itemValue.quantity,
      location_id: itemValue.location_id,
      modelNumber: itemValue.modelNumber,
      manufacturer: itemValue.manufacturer,
      status: itemValue.status,
      url_photo: itemValue.url_photo,
    };
    this.sparepartService.editSparepart(itemValue.id, payload).subscribe({
      next: (res) => {
        console.log('data edited', res);
        this.getAllDataSpareparts();
      },
      error: (err) => console.log('error', err),
    });
  }

  onDeleteSparepart(id: string) {
    console.log('deleted id sparepart', id);
    this.sparepartService.deleteSparepart(id).subscribe({
      next: (res) => {
        console.log('data deleted', res);
        this.getAllDataSpareparts();
      },
      error: (err) => console.log('error', err),
    });
  }
}
