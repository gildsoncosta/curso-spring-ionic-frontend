import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAdressPage } from './pick-adress.page';

const routes: Routes = [
  {
    path: '',
    component: PickAdressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAdressPageRoutingModule {}
