import React,{Component} from 'react'
import Dashboard from './components/dashboard';
import {Redirect } from 'react-router-dom';
import Login from './components/login'
import Layout from './main_layouts/layout'
import DefaultLayout from './main_layouts/defaultLayout'

import auth from './middleware/auth'
import normal from './middleware/normal'
import ProductRouter from './components/product/productRouter'

import OrderRouter from './components/order/orderRouter'
import User from './components/user'
import Category from './components/category/category'
import CategoryAdd from './components/category/categoryAdd'
import CategoryEdit from './components/category/categoryEdit'
import Settings from './components/AdminSetting/setting'
import Logout from './components/logout/logout'

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
    component:ProductRouter,
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
},
{
  path:'/orders',
  exact:false,
  layout:Layout,
  component:OrderRouter,
  middleware:auth
},
{
  path:'/settings',
  exact:false,
  layout:Layout,
  component:Settings,
  middleware:auth
},
{
  path:'/logout',
  exact:false,
  layout:DefaultLayout,
  component:Logout,
  middleware:auth
}
 

];
