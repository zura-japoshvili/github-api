import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../core/services/github.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  repository: any = {};
  repositoryId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
  ) {}

  ngOnInit(): void {
    this.repositoryId = this.route.snapshot.paramMap.get('id')!;
    this.fetchRepositoryDetails();
  }

  fetchRepositoryDetails(): void {
          // Retrieve the owner and repoName from the URL
    const owner = this.route.snapshot.paramMap.get('owner')!;
    const repoName = this.route.snapshot.paramMap.get('repoName')!;

    // Fetch repository details using the service method
    this.githubService.getRepoDetails(owner, repoName).subscribe((repo: any) => {
      this.repository = repo;
    });
  }

  openGitHub(): void {
    window.open(this.repository.html_url, '_blank');
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
}
