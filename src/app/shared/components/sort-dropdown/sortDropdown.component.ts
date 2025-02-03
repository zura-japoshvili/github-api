import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sortDropdown.component.html',
})
export class SortDropdownComponent {
  @Input() columns: { key: string, label: string, sort: string  | null}[] = [];
  @Input() sortField: string = '';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  @Output() sortFieldChange = new EventEmitter<string>();
  @Output() sortOrderChange = new EventEmitter<'asc' | 'desc'>();

  onSortFieldChange(event: any): void {
    this.sortFieldChange.emit(event.target.value);
  }

  toggleSortOrder(): void {
    this.sortOrderChange.emit(this.sortOrder === 'asc' ? 'desc' : 'asc');
  }
}
