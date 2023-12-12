import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorsService } from '../../../services/errors.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage: string = ''

  constructor(private errorSrv: ErrorsService) { }

  ngOnInit(): void {
    this.errorMessage = this.errorSrv.lastError;
  }

  ngOnDestroy(): void {
    this.errorSrv.lastError = "An unknown error has ocurred.";
  }
}
