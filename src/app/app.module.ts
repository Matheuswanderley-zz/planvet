import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from "@angular/http";
import { Camera } from "@ionic-native/camera";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ClientePageModule } from "../pages/cliente/cliente.module";
import { CupomPageModule } from "../pages/cupom/cupom.module";
import { RegulamentoPageModule } from "../pages/regulamento/regulamento.module";
import { CupomProvider } from "../providers/cupom/cupom";
import { UtilProvider } from "../providers/util/util";
import { ClienteProvider } from "../providers/cliente/cliente";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthShortNames: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez"
      ]
    }),
    HttpModule,
    ClientePageModule,
    CupomPageModule,
    RegulamentoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CupomProvider,
    UtilProvider,
    ClienteProvider
  ]
})
export class AppModule {}
