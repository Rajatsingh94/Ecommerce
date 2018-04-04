import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {RestApiService} from '../rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  product = {
    title:'',
    price: 0,
    categoryId: '',
    description:'',
    product_picture: null
  };

  categories: any;
  btnDisabled = false;
  constructor(private data:DataService, private rest:RestApiService, private router:Router) { }

  async ngOnInit() {
    try{
      const data = await this.rest.get('http://localhost:3000/api/categories');
      data['success']
      ? (this.categories = data['categories'])
      : this.data.error(data['message']);
    }catch(error){
      this.data.error(error['message']);
    }
  }

  validate(product){
    if(product.title)
    {
      if(product.price)
      {
        if(product.categoryId)
        {
          if(product.description)
          {
            if(product.product_picture)
            {
              return true;
            }else{
              this.data.error('Please select product image');
            }
          }
          else{
            this.data.error('Please select product description');
          }
        }else{
          this.data.error('Please select product category');
        }
      }else{
        this.data.error('Please select product price');
      }
    }else{
      this.data.error('Please select product title');
    }
  }

  fileChange(event: any)
  {
    
  }
}
