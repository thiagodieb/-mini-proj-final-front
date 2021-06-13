import { Injectable } from '@angular/core';
import { Opportunity as Entity } from 'src/app/models/opportunity.model';
import { CoreApiService } from 'api-consumption-layer';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/* Path da API */
const resourceName = 'jobs';

@Injectable({
    providedIn:  'root'
})
export class JobService {
  private currentPage = 1;

  constructor(public restApi: CoreApiService<Entity>, private http: HttpClient) {
    this.restApi.setUrl(environment.url_api);
    this.restApi.setResource(resourceName);
  }

  get(): Observable<any> {
    return this.fetch(`${resourceName}/pagination?p=${this.currentPage}`);
  }

  paginatePage(): void {
    this.currentPage ++;
  }

  public fetch(path): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/${path}`)
      .pipe(
        tap(items => console.log('Get items')),
        catchError(this.handleError(`get items`, []))
      );
  }

  // tslint:disable-next-line:no-shadowed-variable
  private handleError<Entity>(operation = 'operation', result?: Entity) {
    return (error: any): Observable<Entity> => {
      console.log('Debugging: ', error);
      return of(result as Entity);
    };
  }
}
