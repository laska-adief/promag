import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DetailItemComponent } from '../detail-item/detail-item.component';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.scss'],
})
export class TableDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('table', { static: true }) table!: MatTable<any>;
  @Input() data: string = '';
  @Input() title: string = '';
  @Input() columns: any = [];
  @Input() dataSource: any = new MatTableDataSource([]);
  @Input() displayedColumns = [];
  @Input() buttonAddText = '';
  @Input() isDisplayAddButton = false;
  @Input() originalData = [];
  @Input() sortDataProperty: string = 'name';
  @Output() deleteAsset = new EventEmitter();
  @Output() deleteSparepart = new EventEmitter();
  @Output() deleteConfiguration = new EventEmitter();
  @Output() addAsset = new EventEmitter();
  @Output() addSparepart = new EventEmitter();
  @Output() addConfiguration = new EventEmitter();
  @Output() editAsset = new EventEmitter();
  @Output() editSparepart = new EventEmitter();
  @Output() editConfiguration = new EventEmitter();

  DetailItemDialog!: MatDialogRef<DetailItemComponent>;

  desc: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  sortData(property: string) {
    let sortedData;
    if (this.sort.direction === 'asc') {
      sortedData = this.dataSource.sort(function (a: any, b: any) {
        if (a[property] < b[property]) {
          return -1;
        } else if (a[property] > b[property]) {
          return 1;
        } else {
          console.log('else');
          return 0;
        }
      });
    } else {
      sortedData = this.dataSource.sort(function (a: any, b: any) {
        if (a[property] < b[property]) {
          console.log('if');
          return 1;
        } else if (a[property] > b[property]) {
          console.log('elseif');
          return -1;
        } else {
          return 0;
        }
      });
    }
    this.dataSource = sortedData;
    this.table.renderRows();
  }

  buttonSortData(property: string) {
    let sortedData;
    if (!this.desc) {
      sortedData = this.dataSource.sort(function (a: any, b: any) {
        if (a[property] < b[property]) {
          return -1;
        } else if (a[property] > b[property]) {
          return 1;
        } else {
          console.log('else');
          return 0;
        }
      });
    } else {
      sortedData = this.dataSource.sort(function (a: any, b: any) {
        if (a[property] < b[property]) {
          console.log('if');
          return 1;
        } else if (a[property] > b[property]) {
          console.log('elseif');
          return -1;
        } else {
          return 0;
        }
      });
    }

    this.desc = !this.desc;
    this.dataSource = sortedData;
    this.table.renderRows();
  }

  search(event: any) {
    this.dataSource = this.originalData;
    let filterValue = (event as HTMLInputElement).value;
    if (!filterValue) {
      this.dataSource = this.originalData;
      this.table.renderRows();
    } else {
      filterValue = filterValue.toLocaleLowerCase();
      let filteredData: any = [];
      this.dataSource.forEach((data: any) => {
        const keys = Object.keys(data);
        keys.forEach((key) => {
          if (data[key].toLocaleLowerCase().includes(filterValue)) {
            filteredData.push(data);
          }
        });
      });
      filteredData = _.uniqBy(filteredData, 'id');
      this.dataSource = filteredData;
    }

    this.table.renderRows();
  }

  detailItem(item: any) {
    this.dialog
      .open(DetailItemComponent, {
        disableClose: true,
        minWidth: '60vw',
        data: this.formatDataDialog('view', item),
      })
      .afterClosed()
      .subscribe((value) => {
        console.log('dataafterclosedialogviewdeleteedit', value);
        if (value?.action === 'delete') {
          if (value.data === 'asset') {
            this.deleteAsset.emit(value.id);
          } else if (value?.data === 'sparepart') {
            this.deleteSparepart.emit(value?.id);
          } else if (value?.data === 'configuration') {
            this.deleteConfiguration.emit(value?.id);
          }
        } else if (value?.action === 'edit') {
          if (value.data === 'asset') {
            this.editAsset.emit(value.payload);
          } else if (value?.data === 'sparepart') {
            this.editSparepart.emit(value?.payload);
          } else if (value?.data === 'configuration') {
            this.editConfiguration.emit(value?.payload);
          }
        } else {
          return;
        }
      });
  }

  formatDataDialog(action: string, item?: any) {
    if (this.data === 'asset') {
      const formatedData = {
        data: 'asset',
        action: action,
        id: item?.id,
        displayedItemDetail: [
          { key: 'Id', value: item?.id, inputName: 'id' },
          { key: 'Name', value: item?.name, inputName: 'name' },
          { key: 'Type', value: item?.type, inputName: 'type' },
          {
            key: 'Serial number',
            value: item?.serialNumber,
            inputName: 'serialNumber',
          },
          {
            key: 'Location',
            value: item?.location_id,
            inputName: 'location_id',
          },
          {
            key: 'Model number',
            value: item?.modelNumber,
            inputName: 'modelNumber',
          },
          {
            key: 'Manufacturer',
            value: item?.manufacturer,
            inputName: 'manufacturer',
          },
          { key: 'Current status', value: item?.status, inputName: 'status' },
        ],
        url_photo: item?.url_photo,
      };
      return formatedData;
    } else if (this.data === 'sparepart') {
      const formatedData = {
        data: 'sparepart',
        action: action,
        id: item?.id,
        displayedItemDetail: [
          { key: 'Id', value: item?.id, inputName: 'id' },
          { key: 'Name', value: item?.name, inputName: 'name' },
          { key: 'Type', value: item?.type, inputName: 'type' },
          {
            key: 'Model number',
            value: item?.modelNumber,
            inputName: 'modelNumber',
          },
          {
            key: 'Location',
            value: item?.location_id,
            inputName: 'location_id',
          },
          {
            key: 'Model number',
            value: item?.modelNumber,
            inputName: 'modelNumber',
          },
          {
            key: 'Manufacturer',
            value: item?.manufacturer,
            inputName: 'manufacturer',
          },
          { key: 'Quantity', value: item?.quantity, inputName: 'quantity' },
          { key: 'Current status', value: item?.status, inputName: 'status' },
        ],
        url_photo: item?.url_photo,
      };
      return formatedData;
    } else if (this.data === 'configuration') {
      const formatedData = {
        data: 'configuration',
        action: action,
        id: item?.id,
        displayedItemDetail: [
          { key: 'Id', value: item?.id, inputName: 'id' },
          { key: 'Name', value: item?.name, inputName: 'name' },
          { key: 'Type', value: item?.type, inputName: 'type' },
          { key: 'Details', value: item?.details, inputName: 'details' },
        ],
        url_photo: item?.url_photo,
      };
      return formatedData;
    } else {
      return;
    }
  }

  addItem() {
    this.dialog
      .open(DetailItemComponent, {
        disableClose: true,
        minWidth: '60vw',
        data: this.formatDataDialog('add'),
      })
      .afterClosed()
      .subscribe((value) => {
        console.log('dataafterclosedialogadd', value);
        if (value?.action === 'add') {
          if (value.data === 'asset') {
            this.addAsset.emit(value?.payload);
          } else if (value?.data === 'sparepart') {
            this.addSparepart.emit(value?.payload);
          } else if (value?.data === 'configuration') {
            this.addConfiguration.emit(value?.payload);
          }
        } else {
          return;
        }
      });
  }
}
