import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuerySearch } from '../../types/interfaces/searchQuery';
import { environment } from '../../../environments/environment';

interface Repo {
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface RepoDetails extends Repo {
  created_at: string;
  updated_at: string;
  open_issues_count: number;
}

interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl =  environment.apiUrl;
  ;

  constructor(private http: HttpClient) {}

  searchRepos(query: QuerySearch): Observable<SearchResponse> {
    const { search, pageIndex, pageSize, sortField, sortOrder } = query;

    const params = new HttpParams()
      .set('q', search)
      .set('page', pageIndex.toString())
      .set('per_page', pageSize.toString())
      .set('sort', sortField)
      .set('order', sortOrder);

    return this.http.get<SearchResponse>(`${this.apiUrl}/search/repositories`, { params });
  }

  getRepoDetails(owner: string, repoName: string): Observable<RepoDetails> {
    return this.http.get<RepoDetails>(`${this.apiUrl}/repos/${owner}/${repoName}`);
  }
}
