import React, { useState, useContext } from 'react';
import swal from 'sweetalert';
import OrderContext from '../../Context/order/orderContext';

const AddOrder = () => {
  const orderContext = useContext(OrderContext);
  const { add_order, tickStatic } = orderContext;

  const [order, setOrder] = useState({
    symbol: 'BTCUSDT',
    quantity: '',
    lcdnprice: '',
    lentryprice: '',
    lexitprice: '',
    lslprice: '',
    scdnprice: '',
    sentryprice: '',
    sexitprice: '',
    sslprice: '',
  });

  const onChange = (e) => {
    if (e.target.id === 'quantity') {
      //quantity
      setOrder({
        ...order,
        [e.target.id]: normalize(
          e.target.value,
          tickStatic[order.symbol]['quantity']
        ),
      });
    } else if (e.target.id.includes('price')) {
      //price
      setOrder({
        ...order,
        [e.target.id]: normalize(
          e.target.value,
          tickStatic[order.symbol]['price']
        ),
      });
    } else {
      //symbol
      setOrder({ ...resetorder, [e.target.id]: e.target.value });
    }
  };

  const addOrder = async () => {
    const isEmpty = Object.values(order).some((d) => !d);
    if (isEmpty) {
      swal('Failed!', 'Fill in all the fields before submission!', 'error');
    } else {
      //Check minimum qty
      const { symbol, quantity } = order;
      if (parseFloat(quantity) < tickStatic[symbol]['minQty']) {
        swal(
          'Failed!',
          `Minimum quantity should be ${tickStatic[symbol]['minQty']}`,
          'error'
        );
      } else {
        const approve = await swal({
          title: 'Are you sure?',
          text: 'Please confirm to proceed further!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });

        if (approve) {
          add_order(order);
          setOrder({ ...resetorder });
        }
      }
    }
  };

  return (
    <section className='addOrder'>
      <div>
        <span>SYMBOL/QTY</span>
      </div>
      <div>
        <select value={order.symbol} id='symbol' onChange={onChange}>
          {Object.keys(tickStatic).map((s) => (
            <option key={Math.round(Math.random() * 10 ** 10)} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          value={order.quantity}
          onChange={onChange}
          placeholder='Quantity...'
          type='number'
          id='quantity'
        />
      </div>
      <div>
        <button onClick={addOrder} type='submit'>
          ADD
        </button>
      </div>
      <div>
        <span>LONG ORDERS</span>
      </div>
      <div>
        <input
          value={order.lcdnprice}
          onChange={onChange}
          placeholder='Condition...'
          type='number'
          id='lcdnprice'
        />
      </div>
      <div>
        <input
          value={order.lentryprice}
          onChange={onChange}
          placeholder='Entry...'
          type='number'
          id='lentryprice'
        />
      </div>
      <div>
        <input
          value={order.lexitprice}
          onChange={onChange}
          placeholder='Exit...'
          type='number'
          id='lexitprice'
        />
      </div>
      <div>
        <input
          value={order.lslprice}
          onChange={onChange}
          placeholder='Stop Loss...'
          type='number'
          id='lslprice'
        />
      </div>
      <div>
        <span>SHORT ORDERS</span>
      </div>
      <div>
        <input
          value={order.scdnprice}
          onChange={onChange}
          placeholder='Condition...'
          type='number'
          id='scdnprice'
        />
      </div>
      <div>
        <input
          value={order.sentryprice}
          onChange={onChange}
          placeholder='Entry...'
          type='number'
          id='sentryprice'
        />
      </div>
      <div>
        <input
          value={order.sexitprice}
          onChange={onChange}
          placeholder='Exit...'
          type='number'
          id='sexitprice'
        />
      </div>
      <div>
        <input
          value={order.sslprice}
          onChange={onChange}
          placeholder='Stop Loss...'
          type='number'
          id='sslprice'
        />
      </div>
    </section>
  );
};

const normalize = (d, n) => Math.trunc(Math.round(d * 10 ** n)) / 10 ** n;

const resetorder = {
  symbol: 'BTCUSDT',
  quantity: '',
  lcdnprice: '',
  lentryprice: '',
  lexitprice: '',
  lslprice: '',
  scdnprice: '',
  sentryprice: '',
  sexitprice: '',
  sslprice: '',
};

export default AddOrder;
