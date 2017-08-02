/**
 * Created by dmitricaspa on 18/11/16.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

import { LottoTableComponent } from "./components/lotto-table/lotto-table.component";
import { ResultsComponent } from "./components/results/results.component";

export const ROUTES: Routes = [
    { path: '', component: LottoTableComponent },
    { path: 'results', component: ResultsComponent },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(ROUTES);