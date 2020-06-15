import React, { useEffect, useContext, Fragment } from 'react';
import io from 'socket.io-client';
import OrderContext from '../Context/order/orderContext';

const WS = () => {
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

  return <Fragment></Fragment>;
};

export default WS;
