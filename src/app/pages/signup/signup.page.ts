import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.services';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private formGroup: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  estados: EstadoDTO[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  cidades: CidadeDTO[];

  constructor(
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    private route: Router) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: ['1', [Validators.required]],
      cidadeId: ['1', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        console.log('passou em ionViewDidLoad signup.page', this.estados);
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      },
        error => {
          console.log('erro ao buscar Estados/Cidades', error.status);
          this.route.navigateByUrl('folder/Inbox');
        });
  }

  updateCidades() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      });
  }

  signupUser() {
    console.log('Enviou o Formulário');
  }

}
