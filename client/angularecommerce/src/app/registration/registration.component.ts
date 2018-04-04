import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {RestApiService} from '../rest-api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  name='';
  password='';
  password1='';
  email='';
  isSeller= false;

  btnDisabled = false;

  constructor(private router:Router, private data: DataService, private rest: RestApiService) {

   }

  ngOnInit() {
  }

  validate()
  {
    if(this.name)
    {
      if(this.email)
      {
        if(this.password)
        {
          if(this.password1)
          {
            if(this.password == this.password1)
            {
              return true;
            }else{
              this.data.error('Password didnt match');
            }
          }else{
            this.data.error('COnfirmation password not entered');
          }
        }else{
          this.data.error('Password not entered');
        }
      }else{
        this.data.error('Email is not entered');
      }
    }else{
      this.data.error('name is not entered');
    }
  }

  async register()
  {
    this.btnDisabled = true;
    try{
      if(this.validate())
      {
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/signup',
          {
            name:this.name,
            email: this.email,
            password:this.password,
            isSeller: this.isSeller
          }
        );

        if(data['success'])
        {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['profile/address'])
          .then(()=>{
            this.data.success('Registration successful! Please enter ur shipping address');
          }).catch(error => this.data['message']);
        }else{
          this.data.error(data['message']);
        }
      }
    } catch(error)
    {
      this.data.error(error['message']);
    }  
    this.btnDisabled= false;
  }

}
