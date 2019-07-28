import React,{Component} from 'react'
import Dashboard from './components/dashboard';
import {Redirect } from 'react-router-dom';
import Login from './components/login'
import Layout from './main_layouts/layout'
import DefaultLayout from './main_layouts/defaultLayout'
import auth from './middleware/auth'
import normal from './middleware/normal'
import Product from './components/product/product'
import ProductAdd from './components/product/productAdd'
import ProductEdit from './components/product/productEdit'
import User from './components/user'
import Category from './components/category/category'
import CategoryAdd from './components/category/categoryAdd'
import CategoryEdit from './components/category/categoryEdit'
//import {unregister} from './Interceptor'

export default [
   {
       path:'/',
       component:Login,
       exact:true,
       layout:DefaultLayout,
       middleware:auth
   },
   {
    path:'/login',
    exact:false,
    layout:DefaultLayout,
    component:Login,
    middleware:normal
  },
  {
    path:'/product',
    exact:false,
    layout:Layout,
    component:Product,
    middleware:auth
  },
  {
    path:'/product-edit/:id',
    exact:false,
    layout:Layout,
    component:ProductEdit,
    middleware:auth
  },
  {
    path:'/product-add',
    exact:false,
    layout:Layout,
    component:ProductAdd,
    middleware:auth
  },
  
  {
    path:'/user',
    exact:false,
    layout:Layout,
    component:User,
    middleware:auth
  },
   {
       path:'/dashboard',
       exact:false,
       layout:Layout,
       component:Dashboard,
       middleware:auth
   },
   {
    path:'/category',
    exact:false,
    layout:Layout,
    component:Category,
    middleware:auth
  },
  {
   path:'/category-add',
   exact:false,
   layout:Layout,
   component:CategoryAdd,
   middleware:auth
 },
 {
  path:'/category-edit/:id',
  exact:false,
  layout:Layout,
  component:CategoryEdit,
  middleware:auth
}
 

];

