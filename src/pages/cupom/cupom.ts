import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Cupom } from "../../model/Cupom";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HomePage } from "../home/home";
import { UtilProvider } from "../../providers/util/util";
import { CupomProvider } from "../../providers/cupom/cupom";

@IonicPage()
@Component({
  selector: "page-cupom",
  templateUrl: "cupom.html"
})
export class CupomPage {
  public foto: string;
  public base64Image: string;
  public cupom: Cupom;
  public regulamento: boolean;

  private cupomForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private util: UtilProvider,
    private cupomService: CupomProvider
  ) {
    this.cupom = new Cupom();

    this.cupomForm = this.formBuilder.group({
      vendedor: [""],
      cpf: ["", Validators.required],
      cupom: ["", Validators.required],
      dataCupom: ["", Validators.required],
      codigoBarras: ["", Validators.required],
      regulamento: [false, Validators.required]
    });
  }

  ionViewDidLoad() {}

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.foto = "data:image/jpeg;base64," + imageData;
      },
      err => {
        this.presentAlert(err);
      }
    );
  }

  enviar() { 

    if (!this.util.validarCpf(this.cupom.cpf)) {
      this.presentAlert("CPF Inválido!");
      return;
    }

    if(this.regulamento == false) {
      this.presentAlert("Aceite o regulamento antes de continuar!");
      return;
    }

    if (!this.foto) {
      this.presentAlert("Tire uma foto do cupom antes de enviar os dados!");
      return;
    }

    let loading = this.loadingCtrl.create({
      content: "Enviando suas informações..."
    });

    loading.present().then(() => {
      this.cupom.imagem = this.foto;

      this.cupomService.salvar(this.cupom).subscribe(
        success => {
          let res = JSON.parse(success["_body"]);

          if (res.status == "false") {
            this.presentAlert(res.msg);
          } else {
            this.navCtrl.push(HomePage);
            this.presentToast("Cupom enviado com sucesso!");
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
      duration: 3000
    });
    toast.present();
  }

  validarCpf() {
    if (!this.cupom.cpf) {
      return;
    }

    if (!this.util.validarCpf(this.cupom.cpf)) {
      this.presentAlert("CPF Inválido!");
    } else {
      this.cupom.cpf = this.cupom.cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    }
  }
}
