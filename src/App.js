import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import AddAdmin from './components/AddAdmin';
import AddItem from './components/AddItem';
import AddReview from './components/AddReview';
import AllLists from './components/AllLists';
import AllOrders from './components/AllOrders';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Mylists from './components/Mylists';
import NotFound from './components/NotFound';
import Pay from './components/Pay';
import Purchase from './components/Purchase';
import SignUp from './components/SignUp';
import AuthProvider from './context/AuthProvider';
import AdminRoute from './private/AdminRoute';
import PrivateRoute from './private/PrivateRoute';

function App() {
  return (
    <div className="App">
<AuthProvider>
      <BrowserRouter>
      <Header></Header>
         <Switch>
           <Route path="/login" exact>
              <SignUp></SignUp>
           </Route>
           <Route path="/" exact>
              <Home></Home>
           </Route>
           <Route path="/home" exact>
              <Home></Home>
           </Route>
           <PrivateRoute path="/addreview" exact>
              <AddReview></AddReview>
           </PrivateRoute>
           <AdminRoute path="/addproducts" exact>
              <AddItem></AddItem>
           </AdminRoute>
           <AdminRoute path="/addadmin" exact>
                <AddAdmin></AddAdmin>
           </AdminRoute>
           <AdminRoute path="/allorders" exact>
                <AllOrders></AllOrders>
           </AdminRoute>
           <PrivateRoute path="/mylists" exact>
              <Mylists></Mylists>
           </PrivateRoute>
           <PrivateRoute path="/payment" exact>
              <Pay></Pay>
           </PrivateRoute>
           <Route path="/all_products" exact>
              <AllLists></AllLists>
           </Route>
           <PrivateRoute path="/purchase" exact>
              <Purchase></Purchase>
           </PrivateRoute>
           <PrivateRoute path="/product/:id" exact>
              <Purchase></Purchase>
           </PrivateRoute>
           <Route path="*" exact>
              <NotFound></NotFound>
           </Route>
         </Switch>
         <Footer></Footer>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
