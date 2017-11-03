import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuardService } from './auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { VotingdoneService } from './votingdone.service';
import { ResultsComponent } from './results/results.component';
export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuardService,VotingdoneService] },
    { path: 'results', component: ResultsComponent }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);