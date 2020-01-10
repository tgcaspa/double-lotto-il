/**
 * Created by dmitricaspa on 18/11/16.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './components/lotto-table/lotto-table.module#LottoTableModule',
    },
    {
        path: 'results',
        loadChildren: './components/results/results.module#ResultsModule',
    },
    {
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
