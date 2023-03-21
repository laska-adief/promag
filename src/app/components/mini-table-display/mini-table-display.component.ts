import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-table-display',
  templateUrl: './mini-table-display.component.html',
  styleUrls: ['./mini-table-display.component.scss'],
})
export class MiniTableDisplayComponent implements OnInit {
  @Input() data: string = '';
  @Input() title: string = '';
  @Input() columns: any = [];
  @Input() dataSource: any;
  @Input() displayedColumns = [];

  constructor() {}

  ngOnInit(): void {}
}
