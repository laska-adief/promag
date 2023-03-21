import { Component, OnInit } from '@angular/core';
import { ConfigurationServiceService } from 'src/app/services/configuration-service.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
  data: string = 'configuration';
  columns: any = [];
  dataSource: any;
  displayedColumns = [];
  locations: any = [];
  buttonAddText = 'Add Configuration';
  isDisplayAddButton: boolean = true;

  constructor(private configurationService: ConfigurationServiceService) {}

  ngOnInit(): void {
    this.configureDataConfiguration();
    this.getAllDataConfigurations();
  }

  configureDataConfiguration() {
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
        columnDef: 'details',
        header: 'Details',
        cell: (element: any) => `${element.details}`,
      },
    ];
    this.dataSource = [];
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

  getAllDataConfigurations() {
    this.configurationService.getAllConfigurations().subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          this.dataSource = res;
        }
      },
      error: (err) => console.log(err),
    });
  }

  onAddConfiguration(itemValue: any) {
    console.log('payload', itemValue);
    const payload = {
      id: itemValue.id,
      name: itemValue.name,
      type: itemValue.type,
      details: itemValue.details,
    };
    this.configurationService.addConfiguration(payload).subscribe({
      next: (res) => {
        console.log('data added', res);
        this.getAllDataConfigurations();
      },
      error: (err) => console.log('error', err),
    });
  }

  onEditConfiguration(itemValue: any) {
    console.log('payloadEdit', itemValue);
    const payload = {
      name: itemValue.name,
      type: itemValue.type,
      details: itemValue.details,
    };
    this.configurationService
      .editConfiguration(itemValue.id, payload)
      .subscribe({
        next: (res) => {
          console.log('data edited', res);
          this.getAllDataConfigurations();
        },
        error: (err) => console.log('error', err),
      });
  }

  onDeleteConfiguration(id: string) {
    console.log('deleted id configuration', id);
    this.configurationService.deleteConfiguration(id).subscribe({
      next: (res) => {
        console.log('data deleted', res);
        this.getAllDataConfigurations();
      },
      error: (err) => console.log('error', err),
    });
  }
}
