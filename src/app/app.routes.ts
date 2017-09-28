/**
 * Created by dmitricaspa on 18/11/16.
 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloader } from "./app.routing-loader";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
    },
    {
        path: 'table',
        loadChildren: './components/lotto-table/lotto-table.module#LottoTableModule',
    },
    {
        path: 'results',
        loadChildren: './components/results/results.module#ResultsModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: AppCustomPreloader})
    ],
    exports: [RouterModule],
    providers: [AppCustomPreloader]
})
export class AppRoutingModule { }