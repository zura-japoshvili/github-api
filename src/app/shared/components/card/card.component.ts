import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() dataSource: any[] | null = [];
  @Input() labels: { [key: string]: string } = {};
  @Input() columns: { key: string; label: string }[] = []; // Columns configuration
  @Input() totalItems: number | null = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 1;

  @Output() cardClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();



  objectKeys(obj:{ key: string; label: string }[] ): string[] {
    return Object.values(obj.map((item) => item.key));
  }

  getFieldValue(data: any, field: string): any {
    if (!data || !field) return null;  // Validate data and field

    // Split the field by '.' to handle nested properties (e.g. "owner.login")
    const keys = field.split('.');
    let result = data;

    for (let key of keys) {
      if (result && key in result) {
        result = result[key]; // Traverse through the nested keys
      } else {
        return null;  // Return null if the key is not found
      }
    }

    return result;
  }
  onCardClick(item: any) {
    this.cardClick.emit(item);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }
}
