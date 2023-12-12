import { GitHubUserItem } from './githubuseritem';

export interface GitHubUsersResult {
  incomplete_results: boolean;
  items: GitHubUserItem[];
  total_count: number;
}