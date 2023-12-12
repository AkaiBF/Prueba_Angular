import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubUser } from '../../interfaces/githubuser';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: GitHubUser | undefined;
  userlogin: string = '';

  constructor(private route: ActivatedRoute, 
              private githubSrv: GithubService) {
              }

  ngOnInit() {
    this.route.params.subscribe({next: params => {
      this.userlogin = params['userlogin'] ? params['userlogin'] : '';
      this.githubSrv.userDetail(this.userlogin).subscribe({
        next:(data: GitHubUser) => {
          this.user = data;
        }, error: () => {
        }
      });
    }, error: () => {}});
  }
}
