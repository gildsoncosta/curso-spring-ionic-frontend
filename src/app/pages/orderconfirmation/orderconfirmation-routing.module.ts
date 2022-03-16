import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderconfirmationPage } from './orderconfirmation.page';

const routes: Routes = [
  {
    path: '',
    component: OrderconfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderconfirmationPageRoutingModule {}
