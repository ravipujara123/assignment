import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./modules/dashboard/dashboard.module').then((d)=>d.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path:'sprint',
    loadChildren:()=>import('./modules/sprint/sprint.module').then((s)=>s.SprintModule),
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
