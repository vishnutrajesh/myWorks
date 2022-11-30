import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {SharedService} from "../services/shared/shared.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sharedService.httpRequestLoader.next(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.sharedService.httpRequestLoader.next(false);
      })
    );
  }
}
