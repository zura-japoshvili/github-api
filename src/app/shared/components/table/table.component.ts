import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any= []; // Array of data objects
  @Input() columns: { key: string; label: string }[] = []; // Columns configuration
  @Input() totalItems: number | null = 0; // Total items for pagination
  @Input() pageSize: number = 10; // Items per page
  @Input() pageIndex: number = 1; // Current page number

  @Output() rowClick = new EventEmitter<any>(); // Emit when a row is clicked
  @Output() pageChange = new EventEmitter<number>(); // Emit when the page changes

  get columnKeys(): string[] {
    return this.columns.map(c => c.key);
  }

  // Helper function to get nested property values
  getFieldValue(data: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj && obj[key], data);
  }

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }
}
