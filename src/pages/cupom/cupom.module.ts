import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CupomPage } from './cupom';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CupomPage,
  ],
  imports: [
    IonicPageModule.forChild(CupomPage),
    BrMaskerModule
  ],
})
export class CupomPageModule {}
