import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {AaaComponent} from './components/aaa/aaa.component';
import {BbbComponent} from './components/bbb/bbb.component';

const routes: Routes = [
  <Route> {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aaa'
  },
  <Route> {
    path: 'aaa',
    component: AaaComponent
  },
  <Route> {
    path: 'bbb',
    component: BbbComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes /*, {enableTracing: true} */ )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
