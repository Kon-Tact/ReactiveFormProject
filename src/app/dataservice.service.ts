import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor() { }

  private jsonLastName = 'assets/lastnames.json';
  private jsonFirstName = 'assets/firstname.json';
  private jsonRue = 'assets/rue.json';

  getRandoData(dataType: String): Observable<string> {
    return new Observable(observer => {
      
      let path: RequestInfo = '';

      switch (dataType) {
        case 'lastname':
          path = 'assets/lastnames.json';
          break
        case 'firstname':
          path = 'assets/firstnames.json';
          break
        case 'rue':
          path = 'assets/rue.json';
          break
      }

      fetch(path)
        .then(response => response.json())
        .then(data => {

          let list: string[] = [];

          switch (dataType) {
            case 'lastname':
              list = data.lastname as string[];
              break
            case 'firstname':
              list = data.firstnames as string[];
              break
            case 'rue':
              list = data.streetNames as string[];
              break
          }

          const randomIndex = Math.floor(Math.random() * list.length);
          const randomData = list[randomIndex];

          observer.next(randomData);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
  }
}
