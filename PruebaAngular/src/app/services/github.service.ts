import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubUsersResult } from '../interfaces/githubusersresult';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private url = environment.githubApiUrl;

  constructor(private net: HttpClient) { }

  searchUsers(query: string): Observable<GitHubUsersResult> {
    return (this.net.get(this.url + query)) as Observable<GitHubUsersResult>;
  }
}
