import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';

import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const ProductScreen = React.lazy(() => import('./screens/ProductScreen'));
const CartScreen = React.lazy(() => import('./screens/CartScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
const ShippingScreen = React.lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = React.lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = React.lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = React.lazy(() => import('./screens/OrderScreen/'));
const UserListScreen = React.lazy(() => import('./screens/UserListScreen/'));
const UserEditScreen = React.lazy(() => import('./screens/UserEditScreen'));
// prettier-ignore
const ProductListScreen = React.lazy(() => import('./screens/ProductListScreen'));
// prettier-ignore
const ProductEditScreen = React.lazy(() => import('./screens/ProductEditScreen'));
const OrderListScreen = React.lazy(() => import('./screens/OrderListScreen'));
const NotFoundScreen = React.lazy(() => import('./screens/NotFoundScreen'));

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <React.Suspense fallback={<Loader />}>
            <ToastContainer position='top-right' autoClose={8000} />
            <Switch>
              <Route path='/login' component={LoginScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route
                path='/admin/productlist/'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/productlist/page/:pageNumber'
                component={ProductListScreen}
              />
              <Route
                path='/admin/productlist/search/:keyword'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/productlist/search/:keyword/page/:pageNumber'
                component={ProductListScreen}
                exact
              />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
                exact
              />
              <Route path='/search/:keyword/' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
              />
              <Route path='/' component={HomeScreen} exact />
              <Route path='*' component={NotFoundScreen} />
            </Switch>
          </React.Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
