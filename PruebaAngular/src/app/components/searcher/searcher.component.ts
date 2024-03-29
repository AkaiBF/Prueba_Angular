import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GitHubUsersResult } from '../../interfaces/githubusersresult';
import { GitHubUserItem } from '../../interfaces/githubuseritem';
import { Router } from '@angular/router';
import { ForbiddenValidatorDirective } from '../../directives/forbidden-user.directive';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ForbiddenValidatorDirective],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  githubUsers: GitHubUserItem[] = [];
  query: string = '';
  usersSearched: boolean = false;

  constructor(private githubSrv:GithubService, 
              private router: Router,
              private errorSrv: ErrorsService) { }

  search(): void {
    this.githubSrv.searchUsers(this.query).subscribe({
      next: (data: GitHubUsersResult) => {
        this.githubUsers = data.items.slice(0, 10);
        this.githubUsers.sort(this.compareGitHubUsers);
        this.usersSearched = true;
    }, error: (err) => {
      this.errorSrv.lastError = err.message;
      this.router.navigate(['/error']);
    }});
  }

  compareGitHubUsers(user1: GitHubUserItem, user2: GitHubUserItem): number {
    if(user1.login < user2.login) {
      return -1;
    } else {
      // No nos importa si son iguales, porque no se va a dar el caso
      return 1;
    }
  }

  goToProfile(user: GitHubUserItem): void {
    this.router.navigate(['/profile', user.login]);
  }
}
