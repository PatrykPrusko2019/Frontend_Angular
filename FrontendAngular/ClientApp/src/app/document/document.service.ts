import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DocumentDto } from '../models/document/documentDto';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentUrl = 'https://localhost:7067/api/document';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient, private toastr: ToastrService) { }


  /** GET documents from the server */
  getAll(): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(this.documentUrl)
      .pipe(
        tap(_ => this.log('fetched documents')),
        catchError(this.handleError<DocumentDto[]>('getAll', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new document to the server */
  createDocument(documentDto: DocumentDto): Observable<DocumentDto> {
    return this.http.post<DocumentDto>(this.documentUrl, documentDto, this.httpOptions).pipe(
      tap((newDocument: DocumentDto) => this.log(`added document w/ id=${newDocument.id}`)),
      catchError(this.handleError<DocumentDto>('createDucument'))
    );

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.toastr.error(error.message, ' ');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DocumentService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`DocumentService: ${message}`);
  }
}
