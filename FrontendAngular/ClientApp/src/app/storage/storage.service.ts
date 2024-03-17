import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { StorageDto } from '../models/storage/storageDto';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageUrl = 'https://localhost:7067/api/storage';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient, private toastr: ToastrService, private messageService: MessageService,) { }


  /** GET providers from the server */
  getAll(): Observable<StorageDto[]> {
    return this.http.get<StorageDto[]>(this.storageUrl)
      .pipe(
        tap(_ => this.log('fetched storages')),
        catchError(this.handleError<StorageDto[]>('getAll', []))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      this.toastr.error(error.status + " -> no found documentId, or Price, Unit Pieces must be number", 'ERROR:')



      // TODO: send the error to remote logging infrastructure
      this.log(error.status + " -> no found documentId, or Price, Unit Pieces must be number"); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  /** Log a StorageService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StorageService: ${message}`);
  }

}
