import { Route, PreloadingStrategy } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
      return route.data && route.data.preload ? load() : of(null);
    }
  }