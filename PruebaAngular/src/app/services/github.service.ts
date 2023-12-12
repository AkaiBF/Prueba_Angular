import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubUsersResult } from '../interfaces/githubusersresult';
import { environment } from '../../environment/environment';
import { GitHubUser } from '../interfaces/githubuser';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private userListUrl = environment.githubApiUserListUrl;
  private userDetailUrl = environment.githubApiUserDetailUrl;

  constructor(private net: HttpClient) { }

  searchUsers(query: string): Observable<GitHubUsersResult> {
    return this.net.get(this.userListUrl + query) as Observable<GitHubUsersResult>;
  }

  userDetail(login: string): Observable<GitHubUser> {
    return this.net.get(this.userDetailUrl + login) as Observable<GitHubUser>;
  }
}
