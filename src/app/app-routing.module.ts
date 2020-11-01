import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, isNotAnonymous } from '@angular/fire/auth-guard'
import { pipe } from 'rxjs/internal/util/pipe';
import { map } from 'rxjs/operators'
import { BaseComponent } from './layout/base/base.component';

// ANONNYMOUS USERS TO LOGIN PAGE
const redirectAnonymousTo = (redirect: string[]) => 
  pipe(isNotAnonymous, map(loggedIn => loggedIn || redirect)
);

const redirectUnauthorizedToLogin = () => redirectAnonymousTo(['auth/login']);

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children:[
      { 
        path: 'home', 
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AngularFireAuthGuard],
        data: { 
          authGuardPipe: redirectUnauthorizedToLogin,
        }
      },
      { 
        path: 'profile', 
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AngularFireAuthGuard],
        data: { 
          authGuardPipe: redirectUnauthorizedToLogin,
        }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    // onSameUrlNavigation: 'ignore',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
