import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private valueService: ValueService) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createUser() {
  }
}

