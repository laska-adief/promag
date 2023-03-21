import { Component, OnInit } from '@angular/core';
import { AssetServiceService } from 'src/app/services/asset-service.service';
import { LocationService } from 'src/app/services/location.service';
import { SparepartServiceService } from 'src/app/services/sparepart-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  titleEmptySpareParts: string = 'Empty Spare Parts';
  columnsEmptySpareParts: any = [
    {
      columnDef: 'name',
      header: 'Spare part name',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'location',
      header: 'Location',
      cell: (element: any) => `${element.location}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: any) => `${element.status}`,
    },
  ];
  dataSourceEmptySpareParts: any = [];
  displayedColumnsEmptySpareParts = this.columnsEmptySpareParts.map(
    (c: any) => c.columnDef
  );

  titleInactiveAssets: string = 'Inactive Assets';
  columnsInactiveAssets: any = [
    {
      columnDef: 'name',
      header: 'Asset name',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'location',
      header: 'Location',
      cell: (element: any) => `${element.location}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: any) => `${element.status}`,
    },
  ];
  dataSourceInactiveAssets: any = [];
  displayedColumnsInactiveAssets = this.columnsInactiveAssets.map(
    (c: any) => c.columnDef
  );

  locations: any = [];

  constructor(
    private sparepartService: SparepartServiceService,
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
          this.getDataEmptySpareParts();
          this.getInactiveAssets();
        }
      },
      error: (err) => console.log(err),
    });
  }

  getDataEmptySpareParts() {
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

          this.dataSourceEmptySpareParts = res.slice(0, 5);
        }
      },
      error: (err) => console.log(err),
    });
  }

  getInactiveAssets() {
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

          this.dataSourceInactiveAssets = res.slice(0, 5);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
