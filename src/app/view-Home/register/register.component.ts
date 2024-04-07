import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private AuthProxys: AuthProxyService,
    private router: Router
  ){}

  userForm: FormGroup= new FormGroup({
    firstname: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, Validators.required),
    lastname: new FormControl<string | null>(null, Validators.required),
    uploadresume: new FormControl<string | null>(null, Validators.required),
    eduaction: new FormControl<string | null>(null, Validators.required),
    conntactmethod: new FormControl<string | null>(null, Validators.required),
    contacttime: new FormControl<string | null>(null, Validators.required),
    home: new FormControl<string | null>(null, Validators.required),
    work: new FormControl<string | null>(null, Validators.required),
    mobile: new FormControl<string | null>(null, Validators.required),
    employmenttype: new FormControl<string | null>(null, Validators.required),
    salarexpection: new FormControl<string | null>(null, Validators.required),
    whencanyoustart: new FormControl<string | null>(null, Validators.required),
    employment: new FormControl<string | null>(null, Validators.required),
  })

  onsubmit() { 
    return this.AuthProxys.registerUser(this.userForm.value).subscribe((response) => {
      this.router.navigate(['login'])
    },
    (error) => {
      console.log({message: JSON.stringify({error})})
    })
  }
}
