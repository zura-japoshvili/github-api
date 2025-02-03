import { RepoFieldsEnum } from "../enums/repoField.enum";
import { RepoFieldsSortEnum } from "../enums/repoFieldSort.enum";

export interface QuerySearch {
  search: string;
  pageIndex: number;
  pageSize: number;
  sortField: RepoFieldsSortEnum;
  sortOrder: 'asc' | 'desc';
}
