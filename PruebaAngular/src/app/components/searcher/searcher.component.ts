import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  githubUsers: any[] = [];
  query: string = '';

  constructor(private githubSrv:GithubService) { }

  search(): void {
    this.githubSrv.searchUsers(this.query).subscribe((data:any) => {
    })
  }
}
