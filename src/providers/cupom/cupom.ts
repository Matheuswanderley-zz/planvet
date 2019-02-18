import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Cupom, CupomResponse } from "../../model/Cupom";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";
import { Config } from "../../model/Config";

@Injectable()
export class CupomProvider {
  constructor(public http: Http) {}

  salvar(cupom: Cupom): Observable<CupomResponse> {
    return this.http
      .post(Config.URL_CUPOM, cupom)
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
}
