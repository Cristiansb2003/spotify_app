import { Component, OnInit } from '@angular/core';
import { User, User2 } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MenuServiceService } from '../menu-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  user2: User2 = new User2();
  formRegister : any;

  constructor(
    private autSvc: AuthService,
    private router: Router,
    private menuService: MenuServiceService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  async onRegister(){
    this.autSvc.onRegister(this.user).then(user=>{
      
      this.user2.id = user.user.uid;
      this.autSvc.altaVendedor(this.user2).then((data)=> console.log(data))
        localStorage.setItem('sesion', 'true')
        this.router.navigate(['/']);
      
    }).catch(error=>{
      if(error.code =='auth/email-already-in-use'){
        this.openModal(error);
      }
      console.log(error.code);
    })

  } 
  onLogin(){
    this.menuService.setTitle("login");
    this.router.navigate(["/login"]);
  }

  submitForm(){
    if(this.formRegister.valid){
      this.user.email = this.formRegister.get('email').value;
      this.user.password = this.formRegister.get('password').value;
      this.user2.nombre = this.formRegister.get('nombre').value;
      this.user2.email = this.formRegister.get('email').value;
      this.onRegister();
    }
  }

  ionViewWillEnter(){
    this.formRegister.reset();
  }

  hasError: any = (controlName: string, errorName: string) => {
		return !this.formRegister.controls[controlName].valid &&
			this.formRegister.controls[controlName].hasError(errorName) &&
			this.formRegister.controls[controlName].touched;
	}

  buildForm(){
    this.formRegister = this.formBuilder.group({
      email: new FormControl('',{validators: [Validators.email,Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)]}),
      nombre : new FormControl('', {validators:[Validators.required]})
    });
  }

  async openModal(user: any){
    const modal = await this.modalCtrl.create({
      component: ModalErrorComponent,
      componentProps:{
        error: 'Error al crear el usuario'
      }
    });
    return await modal.present();
  }  

}
