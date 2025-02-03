import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { RepoFieldsEnum } from '../../types/enums/repoField.enum';
import { BehaviorSubject, debounceTime, map, Observable, switchMap, distinctUntilChanged, filter, tap } from 'rxjs';
import { QuerySearch } from '../../types/interfaces/searchQuery';
import { RepoFieldsSortEnum } from '../../types/enums/repoFieldSort.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  query: QuerySearch = {
    search: '',
    pageIndex: 1,
    pageSize: 10,
    sortField: RepoFieldsSortEnum.STARS,
    sortOrder: 'desc'
  };

  viewMode?: 'table' | 'card';

  // Columns for table view
  columns = [
    { key: RepoFieldsEnum.NAME, label: 'Name', sort: RepoFieldsSortEnum.NAME },
    { key: RepoFieldsEnum.OWNER_LOGIN, label: 'Owner', sort: RepoFieldsSortEnum.OWNER_LOGIN },
    { key: RepoFieldsEnum.DESCRIPTION, label: 'Description', sort: RepoFieldsSortEnum.DESCRIPTION },
    { key: RepoFieldsEnum.LANGUAGE, label: 'Language', sort: RepoFieldsSortEnum.LANGUAGE },
    { key: RepoFieldsEnum.AVATAR_URL, label: 'Avatar', sort: null },
    { key: RepoFieldsEnum.STARGAZERS_COUNT, label: 'Stars', sort: RepoFieldsSortEnum.STARS },
    { key: RepoFieldsEnum.FORKS_COUNT, label: 'Forks',  sort: RepoFieldsSortEnum.FORKS },
    { key: RepoFieldsEnum.UPDATED_AT, label: 'Last Updated', sort: RepoFieldsSortEnum.UPDATED_AT }
  ];

  dataSource$: Observable<{ items: any[], total_count: number }> = new Observable();

  private searchQuerySubject = new BehaviorSubject<QuerySearch>({
    search: '',
    pageIndex: 1,
    pageSize: 10,
    sortField: RepoFieldsSortEnum.STARS,
    sortOrder: 'desc'

  });

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.dataSource$ = this.route.queryParams.pipe(
      debounceTime(300),
      map((params) => ({
        search: params['search'] || '',
        pageIndex: Number(params['pageIndex']) || 1,
        pageSize: Number(params['pageSize']) || 10,
        viewMode: params['viewMode'] || 'card',
        sortField: params['sortField'] || RepoFieldsSortEnum.STARS,
        sortOrder: params['sortOrder'] || 'desc',
      })),
      tap(({ search, pageIndex, pageSize, viewMode, sortField, sortOrder }) => {
        // Update query object with new values
        this.query = { search, pageIndex, pageSize, sortField, sortOrder };
        this.viewMode = viewMode;
      }),
      distinctUntilChanged((prev, curr) =>
        prev.search === curr.search &&
        prev.pageIndex === curr.pageIndex &&
        prev.pageSize === curr.pageSize &&
        prev.sortField === curr.sortField &&
        prev.sortOrder === curr.sortOrder
      ),
      filter(({ search }) => !!search),
      switchMap(({ search, pageIndex, pageSize, sortField, sortOrder }: QuerySearch) =>
        this.githubService.searchRepos({search, pageIndex, pageSize, sortField, sortOrder})
      )
    );
  }

  onSearchChange(): void {
    this.updateQueryParams();
  }

  onRepoSelect(repo: any): void {
    const { owner, name } = repo;

    this.router.navigate([`/repo-details/${owner.login}/${name}`]);
  }

  onPageChange(page: number): void {
    if (page !== this.query.pageIndex) {
      this.query.pageIndex = page;
      this.updateQueryParams();
    }
  }

  onSortFieldChange(newSortField: string): void {
    this.query.sortField = newSortField as RepoFieldsSortEnum;
    this.updateQueryParams();

  }

  onSortOrderChange(newSortOrder: 'asc' | 'desc'): void {
    this.query.sortOrder = newSortOrder;
    this.updateQueryParams();

  }

  onViewModeChange(newViewMode: 'table' | 'card'): void {
    if (newViewMode !== this.viewMode) {
      this.viewMode = newViewMode;
    }
  }

  private updateQueryParams(): void {
    const newParams = {
      ...this.query,
      viewMode: this.viewMode
    };

    this.router.navigate([], { queryParams: newParams, queryParamsHandling: 'merge' });
    this.searchQuerySubject.next(newParams);
  }
}
