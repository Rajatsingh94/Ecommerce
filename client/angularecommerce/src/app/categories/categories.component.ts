import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {RestApiService} from '../rest-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any;
  constructor(private data: DataService, private rest: RestApiService) { }

  ngOnInit() {

    try{
      const data = this.rest.get('http:localhost:3000/api/categories');

      data['success']
      ? (this.categories = data['categories'])
      : this.data.error(data['message']);
    }catch(error){
      this.data.error(error);
    }

  }



}
