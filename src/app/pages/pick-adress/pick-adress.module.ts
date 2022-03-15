import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickAdressPageRoutingModule } from './pick-adress-routing.module';

import { PickAdressPage } from './pick-adress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickAdressPageRoutingModule
  ],
  declarations: [PickAdressPage]
})
export class PickAdressPageModule {}
