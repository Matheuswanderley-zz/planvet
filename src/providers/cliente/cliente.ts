import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import { Cliente, ClienteResponse } from "../../model/Cliente";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Config } from "../../model/Config";

@Injectable()
export class ClienteProvider {
  constructor(public http: Http) {}

  salvar(cliente: Cliente): Observable<any> {
    return this.http
      .post(Config.URL_CLIENTE, cliente)
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }
}
