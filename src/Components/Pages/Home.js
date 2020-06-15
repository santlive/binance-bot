import React, { Fragment } from 'react';
import WS from '../../Utils/WS';
import AddOrder from '../Orders/AddOrder';
import OrdersList from '../Orders/OrdersList';

const Home = () => {
  return (
    <Fragment>
      <header>
        <h1>
          <i className='fas fa-chart-line'></i>Binance Bot
        </h1>
      </header>
      <AddOrder />
      <OrdersList />
      <WS />
    </Fragment>
  );
};

export default Home;
