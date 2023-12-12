import { TestBed } from '@angular/core/testing';
import { GitHubUsersResult } from './../interfaces/githubusersresult';
import { GitHubUser } from './../interfaces/githubuser';
import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GithubService', () => {

  let spy: jasmine.SpyObj<HttpClient>;
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    spy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GithubService(spy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can search users', (done: DoneFn) => {
    const mockResult: GitHubUsersResult = {
      incomplete_results: false,
      items: [],
      total_count: 0
    };
    spy.get.and.returnValue(asyncData(mockResult));
    service.searchUsers('test').subscribe({
      next:(data: any) => {
        expect(data).toEqual(mockResult);
        done();
      },
      error: done.fail
    })
    expect(spy.get.calls.count()).toBe(1);
  })

  it('can search one user', (done: DoneFn) => {
    const mockResult: GitHubUser = {
      avatar_url: '',
      events_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      html_url: '',
      id: 0,
      login: 'test',
      organizations_url: '',
      received_events_url: '',
      repos_url: '',
      score: 0,
      starred_url: '',
      subscriptions_url: '',
      type: '',
      url: ''
    };
    spy.get.and.returnValue(asyncData(mockResult));
    service.userDetail('test').subscribe({
      next:(data: any) => {
        expect(data).toEqual(mockResult);
        done();
      },
      error: done.fail
    })
    expect(spy.get.calls.count()).toBe(1);
  })

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
