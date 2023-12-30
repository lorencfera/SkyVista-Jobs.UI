import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "./loadinng.service";

@Injectable({
    providedIn: 'root',
  })
  export class LoadersInterceptors implements HttpInterceptor {
    constructor(private LoadingS4rvice: LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.LoadingS4rvice.setLoading(true, req.url)
    return next.handle(req).pipe(
      finalize(() => {
        this.LoadingS4rvice.setLoading(false, req.url);
      }))
  }
}