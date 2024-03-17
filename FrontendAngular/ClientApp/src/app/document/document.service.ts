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

  /** GET document by id. Will 404 if id not found */
  getById(id: number): Observable<DocumentDto> {
    const url = `${this.documentUrl}/${id}`;
    return this.http.get<DocumentDto>(url).pipe(
      tap(_ => this.log(`fetched document id=${id}`)),
      catchError(this.handleError<DocumentDto>(`getById id=${id}`))
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

  /** PUT: update the document on the server */
  update(document: DocumentDto): Observable<DocumentDto> {
    return this.http.put<DocumentDto>(`${this.documentUrl}/${document.id}`, document, this.httpOptions).pipe(
      tap(_ => this.log(`updated document id=${document.id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  /** DELETE: delete the document from the server */
  delete(id: number): Observable<DocumentDto> {
    const url = `${this.documentUrl}/${id}`;

    return this.http.delete<DocumentDto>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted document id=${id}`)),
      catchError(this.handleError<DocumentDto>('deleteDocument'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.toastr.error("ERROR: " + error.status, ' ');
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
    this.toastr.error("SUCCESS: " + message.toString());
    //this.messageService.add(`DocumentService: ${message}`);
  }
}
