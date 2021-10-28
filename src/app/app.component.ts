import {Component, HostBinding} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {IconService} from "./services/icon.service";
import {AuthGuard} from "./services/auth.guard";
import {SecurityService} from "./services/security.service";
import {UserProfileService} from "./services/user-profile.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  user:any = {};
  isDarkMode:boolean;

  @HostBinding('class') className = '';
  toggleControl = new FormControl(true);
  theme = new BehaviorSubject("dark-theme");

  constructor(private iconService:IconService,private themeService:ThemeService,private authGuard:AuthGuard, private securityService: SecurityService, private userProfileService : UserProfileService, private overlay: OverlayContainer) {
    this.iconService.registerIcons();
    themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.authGuard.listenForActivateUser().subscribe(u=>{
      this.user = u;
    });
  }

  onLogout($event: MouseEvent) {
    this.securityService.logout().subscribe(()=>{
      this.securityService.removeToken();
    });
  }

  toggleDarkMode() {
    this.isDarkMode ? this.themeService.update('light-mode') : this.themeService.update('dark-mode');
  }
}
