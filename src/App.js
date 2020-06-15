import React from 'react';
import Home from './Components/Pages/Home';

import OrderState from './Context/order/OrderState';

const App = () => {
  return (
    <OrderState>
      <Home />
    </OrderState>
  );
};

export default App;
