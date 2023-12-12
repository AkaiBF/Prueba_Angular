import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GitHubUser } from '../../interfaces/githubuser';
import { GithubService } from '../../services/github.service';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: GitHubUser | undefined;
  userlogin: string = '';

  constructor(private route: ActivatedRoute, 
              private githubSrv: GithubService,
              private errorSrv: ErrorsService,
              private router: Router) {
              }

  ngOnInit() {
    this.route.params.subscribe({next: params => {
      this.userlogin = params['userlogin'] ? params['userlogin'] : '';
      this.githubSrv.userDetail(this.userlogin).subscribe({
        next:(data: GitHubUser) => {
          this.user = data;
        }, error: (err) => {
          this.errorSrv.lastError = err.message;
          this.router.navigate(['/error']);
        }
      });
    }, error: (err) => {
      this.errorSrv.lastError = err.message;
      this.router.navigate(['/error']);
    }});
  }
}
