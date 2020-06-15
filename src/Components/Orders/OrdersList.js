import React, { useContext } from 'react';
import OrderItem from './OrderItem';
import OrderContext from '../../Context/order/orderContext';

const OrdersList = () => {
  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  return (
    <section className='ordersList'>
      <div className='head'>
        <h6>ID</h6>
        <h6>SYMBOL</h6>
        <h6>QTY</h6>
        <h6>LONG CDN</h6>
        <h6>LONG ENTRY</h6>
        <h6>LONG EXIT</h6>
        <h6>LONG SLOSS</h6>
        <h6>SHORT CDN</h6>
        <h6>SHORT ENTRY</h6>
        <h6>SHORT EXIT</h6>
        <h6>SHORT SLOSS</h6>
        <h6>STATUS</h6>
      </div>
      {orders.map((order) => (
        <OrderItem key={order.orderID} order={order} />
      ))}
    </section>
  );
};

export default OrdersList;
