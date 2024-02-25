import 'bootstrap/dist/css/bootstrap.min.css';
import  "./assets/styles/index.css"
import "./assets/styles/bootstrap.custom.css"

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AdminRoute from './Screens/Admin/AdminRoute.jsx';
import App from './App';
import CartScreen from './Screens/cartScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/loginScreen.jsx';
import OrderListScreen from './Screens/Admin/OrderListScreen.jsx';
import OrderScreen from './Screens/OrderScreen.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PaymentScreen from './Screens/PaymentScreen.jsx';
import PlaceOrderScreen from './Screens/placeOrderScreen.jsx';
import PrivateRoute from './Screens/PrivateRoute.jsx';
import ProductEditScreen from './Screens/Admin/ProductEditScreen.jsx';
import ProductListScreen from './Screens/Admin/ProductListScreen.jsx';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen.jsx';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import ShippingScreen from './Screens/shippingScreen.jsx';
import store from './store';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route index={true} path='/' element={<HomeScreen/>}/>
       <Route path='/product/:id' element={<ProductScreen/>}/>
       <Route path='/cart' element={<CartScreen/>}/>
       <Route path='/login' element={<LoginScreen/>}/>
       <Route path='/register' element={<RegisterScreen/>}/>
       {/* private route*/}
       <Route path='/' element={<PrivateRoute/>}>
       <Route path='/shipping' element={<ShippingScreen/>}/>
       <Route path='/payment' element={<PaymentScreen/>}/>
       <Route path='/profile' element={<ProfileScreen/>}/>
          <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
          <Route path='/order/:id' element={<OrderScreen/>}/>
          
       </Route>
       {/*Admin Route */}
       <Route path='/admin' element={<AdminRoute/>}>
       <Route path='/admin/orderList' element={<OrderListScreen/>}/>
       <Route path='/admin/productList' element={<ProductListScreen/>}/>
       <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
       
       </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider >
      <RouterProvider router={router}/>
      </PayPalScriptProvider>
  
    </Provider>
  
  </React.StrictMode>
);


