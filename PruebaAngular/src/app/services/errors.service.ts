import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  public lastError: string = "An unknown error has ocurred.";

  constructor() { }
}
