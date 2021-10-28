import {EventEmitter, Injectable, Output} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {SecurityService} from "./security.service";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Output() activateUserEvent = new EventEmitter<any>();

  private activateUser = new Subject();

  listenForActivateUser() {
    return this.activateUser.asObservable();
  }

  constructor(private securityService: SecurityService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.securityService.isLoggedIn()){
      this.securityService.setRedirectUrl(state.url);
      this.router.navigate(['/login']);
      return false;
    }

    return this.securityService.fetchUser().pipe(
      map((u) =>{
          if(u['login']){
            this.activateUser.next(u);
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        }), catchError((err: HttpErrorResponse) => {
        this.router.navigateByUrl('/login');
        return of(false);
      }));
  }

}
