import { NgModule } from "@angular/core";
import { TableComponent } from "./components/table/table.component";
import { CardComponent } from "./components/card/card.component";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon } from "@angular/material/icon";
import { SortDropdownComponent } from "./components/sort-dropdown/sortDropdown.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [TableComponent,CardComponent, SortDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon
  ],
  exports: [TableComponent,CardComponent, SortDropdownComponent],
})
export class SharedModule {}
