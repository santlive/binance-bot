import React, { useEffect, useContext, Fragment } from 'react';
import io from 'socket.io-client';
import AddOrder from '../Orders/AddOrder';
import OrdersList from '../Orders/OrdersList';

import OrderContext from '../../Context/order/orderContext';

const Home = () => {
  const orderContext = useContext(OrderContext);
  const { load_tickstatic, load_orders, update_order } = orderContext;

  useEffect(() => {
    const ws = io.connect('/');
    ws.on('connect', () => {
      console.log('Socket connection successful!');
    });

    ws.on('TICKSTATIC', (payload) => {
      load_tickstatic(payload);
    });

    ws.on('ORDERS', (payload) => {
      load_orders(payload);
    });

    ws.on('ORDERUPDATE', (payload) => {
      update_order(payload);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <header>
        <h1>
          <i className='fas fa-chart-line'></i>Binance Bot
        </h1>
      </header>
      <AddOrder />
      <OrdersList />
    </Fragment>
  );
};

export default Home;
