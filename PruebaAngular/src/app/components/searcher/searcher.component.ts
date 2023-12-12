import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GitHubUsersResult } from '../../interfaces/githubusersresult';
import { GitHubUser } from '../../interfaces/githubuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  githubUsers: GitHubUser[] = [];
  query: string = '';
  usersSearched: boolean = false;

  constructor(private githubSrv:GithubService, 
              private router: Router) { }

  search(): void {
    this.githubSrv.searchUsers(this.query).subscribe((data: GitHubUsersResult) => {
      this.githubUsers = data.items.slice(0, 10);
      this.githubUsers.sort(this.compareGitHubUsers);
      this.usersSearched = true;
    })
  }

  compareGitHubUsers(user1: GitHubUser, user2: GitHubUser): number {
    if(user1.login < user2.login) {
      return -1;
    } else {
      // No nos importa si son iguales, porque no se va a dar el caso
      return 1;
    }
  }

  goToProfile(user: GitHubUser): void {
    this.router.navigate(['/profile', user.login]);
  }
}
