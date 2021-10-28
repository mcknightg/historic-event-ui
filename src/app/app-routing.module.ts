import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback/callback.component";
import {AuthGuard} from "./services/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventFormComponent} from "./event-form/event-form.component";
import {EventTableComponent} from "./event-table/event-table.component";

const routes: Routes = [
		{path : 'event',     			component:EventFormComponent},
		{path : 'event/:id',     			component:EventFormComponent},
		{path : 'events',     			component:EventTableComponent},

   {path : 'home',             component: HomeComponent},
   {path : 'login',            component: LoginComponent},
   {path : 'callback',         component: CallbackComponent},
   {path : 'dashboard',        component: DashboardComponent,canActivate: [AuthGuard]},
   {path : 'docs',             loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) },
   {path : '**',               redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
