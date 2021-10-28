import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../services/security.service";
import {IconService} from "../services/icon.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private iconService:IconService,private securityService: SecurityService) {
    this.iconService.registerIcons();
  }

  ngOnInit(): void {

  }

  login() {
    this.securityService.login();
  }

}
