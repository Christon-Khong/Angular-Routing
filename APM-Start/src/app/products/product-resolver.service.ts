import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id is not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});
      }

    return this.productService.getProduct(+id)
    .pipe(
      map(product => ({product: product})),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({product: null, error: message});
      })
    );
  }

  constructor(private productService: ProductService) {  }
}
