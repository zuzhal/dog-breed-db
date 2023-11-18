import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { IDog, IDogImageDetailAPI } from '../model/dog';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  public dogs$ = new BehaviorSubject([] as IDog[]);
  public loading$ = new BehaviorSubject(true);

  private readonly dogsURL = `${environment.apiUrl}/breeds`;
  private readonly imagesURL = `${environment.apiUrl}/images`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': environment.apiKey,
    }),
  };

  private _http = inject(HttpClient);

  getDogs(): Observable<IDog[]> {
    return this._http.get<IDog[]>(`${this.dogsURL}?limit=10`).pipe(
      tap((dogs) => this.setDogs(dogs)),
      finalize(() => this.loading$.next(false))
    );
  }

  getDogDetail(referanceImageId: string): Observable<IDogImageDetailAPI> {
    return this._http.get<IDogImageDetailAPI>(
      `${this.imagesURL}/${referanceImageId}`,
      this.httpOptions
    );
  }

  private setDogs(dogs: IDog[]) {
    this.dogs$.next(dogs);
  }
}
