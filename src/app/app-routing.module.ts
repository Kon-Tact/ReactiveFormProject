import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'signin', component: SignInFormComponent},
  {path: 'students', component: AppComponent},
  {path: '', redirectTo: 'students', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
