import { Injectable } from '@angular/core';
import { Tag as Entity } from 'src/app/models/tags.model';
import { CoreApiService } from 'api-consumption-layer';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/* Path da API */
const resourceName = 'tags';

@Injectable({
  providedIn:  'root'
})
export class TagsService {
  constructor(public  restApi: CoreApiService<Entity>, private http: HttpClient) {
    this.restApi.setUrl(environment.url_api);
    this.restApi.setResource(resourceName);
  }

  search(tags: string): Observable<any> {
    return this.fetch(`jobs/${resourceName}?t=${tags}`);
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
