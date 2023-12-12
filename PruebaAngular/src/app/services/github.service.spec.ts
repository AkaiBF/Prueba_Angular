import { GitHubUsersResult } from './../interfaces/githubusersresult';
import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

describe('GithubService', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let service: GithubService;

  beforeEach(() => {
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

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
