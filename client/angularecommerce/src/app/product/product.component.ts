import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import{RestApiService} from '../rest-api.service';
import {DataService} from '../data.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(private data:DataService, private rest:RestApiService, private activatedRouter: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(res=>{
      this.rest.get(`http://localhost:3000/api/product/${res['id']}`)
      .then(data=>{
        data['success']
        ? (this.product = data['product'])
        : this.router.navigate(['/']);
      }).catch(error => this.data.error(error['message']));
    })
  }

}
