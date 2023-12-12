import { GitHubUser } from './githubuser';

export interface GitHubUsersResult {
  incomplete_results: boolean;
  items: GitHubUser[];
  total_count: number;
}