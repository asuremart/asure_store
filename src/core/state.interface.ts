/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AuthState } from './auth/reducer/auth.state';
import { AccountState } from './account/reducer/account.state';
import { ProductControlState } from './product-control/reducer/product-control.state';
import { WishlistState } from './wishlist/reducer/wishlist.state';
import { CommonState } from './common/reducer/common.state';
import { CartState } from './cart/reducer/cart.state';
import { ListsState } from './lists/reducer/lists.state';
import { CompareProductState } from './product-compare/reducer/product-compare.state';
import { BlogsState } from './blogs/reducer/blogs.state';


export interface AppState {
  auth: AuthState;

  account: AccountState;
  productControl: ProductControlState;
  wishlist: WishlistState;
  common: CommonState;
  cart: CartState;
  list: ListsState;
  compare: CompareProductState;
  blogs: BlogsState;

}
