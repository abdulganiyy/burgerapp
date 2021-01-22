import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
    <>
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/orders' exact component={Orders}/>
        <Route path='/checkout' component={Checkout }/>  
        </Switch>
      </Layout>
    </>
    </BrowserRouter>
    
  );
}

export default App;
