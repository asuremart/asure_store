/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// components
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { AuthGuard } from '../core/service/auth.guard';
import { LayoutAuthGuard } from '../core/service/layout_auth.guard';
import { UnderDevelopingComponent } from './pages/layout/under-developing/under-developing.component';
import { GetDirectionsComponent } from './shared/get-directions/get-directions.component';
import { SetPasswordComponent } from './pages/Authentication/set-password/set-password.component';
import { LayoutContainerComponent } from './common/layout/layout.container';


export const routes: Routes = [
{
path: '',
component: LayoutContainerComponent,
canActivate: [LayoutAuthGuard],
children: [
{
path: '',
loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
},
{
path: 'home',
loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
},

{
path: 'underdeveloping',
component: UnderDevelopingComponent,
data: {
urls: [{ title: 'UNDER DEVELOPING', url: '' }]
}
},
{
path: 'getdirections',
component: GetDirectionsComponent,
data: {
urls: [{ title: 'Get Directions', url: '' }]
}
},
{
path: 'account',
canActivate: [AuthGuard],
loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
data: {
urls: [{ title: 'Account Settings', url: '' }]
}
},
{
path: 'wishlist',
canActivate: [AuthGuard],
loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule),
data: {
urls: [{ title: 'Wishlist', url: '' }]
}
},
{
  path: 'widget-list/:id',
  loadChildren: () => import('./pages/widget-list/widget-list.module').then(m => m.WidgetListModule)
  },
{
path: 'compare',
loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule),
data: {
urls: [{ title: 'Products', url: '/products' },
{ title: 'Product Compare' }]
}
},
{
path: 'cart',
loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
data: {
urls: [{ title: 'Cart', url: '' }]
}
},
{
path: 'checkout',
loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule),
data: {
urls: [{ title: 'Checkout', url: '' }]
}
},
{
path: 'contact',
loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule),
data: {
urls: [{ title: 'Contact', url: '' }]
}
},
{
path: 'track-order',
loadChildren: () => import('./pages/track-order/track-order.module').then(m => m.TrackOrderModule),
data: {
urls: [{ title: 'Track Order', url: '' }]
}
},
{
path: 'vendor',
loadChildren: () => import('./pages/vendor/vendor.module').then(m => m.VendorModule),
data: {
urls: [{ title: 'Vendor Sign Up', url: '' }]
}
},
{
path: 'vendor-detail',
loadChildren: () => import('./pages/vendor-detail/vendor-detail.module').then(m => m.VendorDetailModule),
data: {
urls: [{ title: 'Vendor Details', url: '' }]
}
},
{
path: 'auth',
canActivate: [AuthGuard],
loadChildren: () => import('./pages/Authentication/authentication.module').then(m => m.AuthenticationModule),
data: {
  urls: [{ title: 'Sign In', url: '' }],
  permission: 'auth'
}
},
{
path: 'page-detail/:id',
data: {
  urls: [{ title: 'page-detail', url: '' }],
},
component: DetailPageComponent
},
{
path: 'products',
loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
},
{
path: 'products/:id',
loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
data: {
urls: [{ title: 'Product Detail ', url: '' }]
}
},
{
path: 'blogs',
loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule),
},
{
path: 'services',
loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule),
},
{
path: 'stock-checkout',
loadChildren: () => import('./pages/stock-checkout/stock-checkout.module').then(m => m.StockCheckoutModule),
data: {
  urls: [{ title: 'stock-checkout', url: '' }],
},
},
]
},
{
  path: 'setPassword/:id',
  component: SetPasswordComponent
},
{
path: '**',
component: NotFoundComponent
},

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class DefaultRoutingModule { }
