import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Cliente } from "../../model/Cliente";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HomePage } from "../home/home";
import { ClienteProvider } from "../../providers/cliente/cliente";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: "page-cliente",
  templateUrl: "cliente.html"
})
export class ClientePage {
  public cliente: Cliente;
  private clienteForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private util: UtilProvider,
    private clienteService: ClienteProvider
  ) {
    this.cliente = new Cliente();

    this.clienteForm = this.formBuilder.group({
      nome: ["", Validators.required],
      dataNascimento: ["", Validators.required],
      celular: ["", Validators.required],
      cpf: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  ionViewDidLoad() {}

  public enviar() {
    if (!this.util.validarCpf(this.cliente.cpf)) {
      this.presentAlert("CPF Inválido!");
      return;
    }

    let loading = this.loadingCtrl.create({
      content: "Enviando suas informações..."
    });

    loading.present().then(() => {
      this.clienteService.salvar(this.cliente).subscribe(
        success => {
          let res = JSON.parse(success["_body"]);
          
          if (!res.status) {
            this.presentAlert(res.msg);
          } else {
            this.navCtrl.push(HomePage);
            this.presentToast("Cadastro enviado com sucesso!");
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          this.presentAlert(error);
        }
      );
    });
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: "Mensagem",
      buttons: ["OK"]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  validarCpf() {
    if (!this.cliente.cpf) {
      return;
    }

    if (!this.util.validarCpf(this.cliente.cpf)) {
      this.presentAlert("CPF Inválido!");
    } else {
      this.cliente.cpf = this.cliente.cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    }
  }
}
