/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private formGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _router: ActivatedRoute,
    private route: Router) {

      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required],
      });
    }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('this._router.snapshot.paramMap:',this._router.snapshot.paramMap['params']['ped']);
    this.pedido = JSON.parse(this._router.snapshot.paramMap['params']['ped']);

    console.log('this.pedido: ', this.pedido);
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    console.log('nextPage em payment.page: ', this.pedido);
    if (this.pedido) {
      this.route.navigate(['orderconfirmation', {ped: JSON.stringify(this.pedido)}]);
    }
  }

}
