import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  data: string = 'history';
  columns: any = [];
  dataSource: any;
  displayedColumns = [];
  locations: any = [];
  isDisplayAddButton: boolean = false;
  sortData = 'createdAt';

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.configureDataHistory();
    this.getAllDataHistories();
  }

  configureDataHistory() {
    this.columns = [
      {
        columnDef: 'createdAt',
        header: 'Time',
        cell: (element: any) => `${element.createdAt}`,
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: any) => `${element.title}`,
      },
      {
        columnDef: 'user',
        header: 'User',
        cell: (element: any) => `${element.user}`,
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

  getAllDataHistories() {
    this.historyService.getAllHistories().subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          this.dataSource = res;
        }
      },
      error: (err) => console.log(err),
    });
  }
}
