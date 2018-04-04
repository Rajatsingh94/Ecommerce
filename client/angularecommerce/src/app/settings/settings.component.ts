import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {RestApiService} from '../rest-api.service';
import { settings } from 'cluster';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  btnDisabled = false;
  currentSetting: any;

  constructor(private data: DataService, private rest:RestApiService) { 

  }

  async ngOnInit() {
    try{

      if(!this.data.user)
      {
        await this.data.getProfile();
      }
      this.currentSetting = Object.assign({
        newPwd:'',
        pwdConfirm:''
      },this.data.user);
    }catch(error){
      this.data.error(error);
    }
  }

  validate(Settings){
    if(settings['name']){
      if(settings['email']){
        if(settings['newPwd']){
          if(settings['pwdConfirm']){
            if(settings['newPwd']== settings['pwdConfirm'])
            {
              return true;
            }else{
              this.data.error('Password do not match');
            }
          }else{
            this.data.error('Please Enter confirmation password');
          }
        }else{
          if(!settings['pwdConfirm'])
          {
            return true;
          }else{
            this.data.error('Please enter a new Password');
          }
        }
      }else{
        this.data.error('please enter your email');
      }
    }else{
      this.data.error('Please enter ur name');
    }
  }

  async update(){
    this.btnDisabled = true;
    try{
      if(this.validate(this.currentSetting)){
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/profile',
          {
            name: this.currentSetting['name'],
            email:this.currentSetting['email'],
            password:this.currentSetting['password'],
            isSeller: this.currentSetting['isSeller']
          }
        );

        data['success']
        ? (this.data.getProfile(),this.data.success(data['message']))
        : this.data.error(data['message']);
      }
    }catch(error){
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}

