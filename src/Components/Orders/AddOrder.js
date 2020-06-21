import React, { useState, useContext } from 'react';
import swal from 'sweetalert';
import OrderContext from '../../Context/order/orderContext';

const AddOrder = () => {
  const orderContext = useContext(OrderContext);
  const { add_order, tickStatic } = orderContext;

  const [order, setOrder] = useState({
    symbol: '',
    quantity: '',
    lprices: '',
    sprices: '',
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
    } else if (['lprices', 'sprices'].includes(e.target.id)) {
      //price
      setOrder({
        ...order,
        [e.target.id]: e.target.value,
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
        //derive actual prices
        const { symbol, quantity, lprices, sprices } = order;
        const [lcdnprice, lentryprice, lexitprice, lslprice, ...lexcess] = [
          ...lprices.split(','),
        ].map((v) => normalize(v, tickStatic[symbol]['price']));
        const [scdnprice, sentryprice, sexitprice, sslprice, ...sexcess] = [
          ...sprices.split(','),
        ].map((v) => normalize(v, tickStatic[symbol]['price']));

        const isInvalid = [
          lcdnprice,
          lentryprice,
          lexitprice,
          lslprice,
          scdnprice,
          sentryprice,
          sexitprice,
          sslprice,
        ].some((d) => !d);

        if (isInvalid) {
          swal(
            'Failed!',
            'Invalid values entered for Long/Short price fields!',
            'error'
          );
          return;
        }

        const isExcess = lexcess.length || sexcess.length;

        if (isExcess) {
          swal(
            'Failed!',
            'More than four values entered for Long/Short price fields!',
            'error'
          );
          return;
        }

        const payload = {
          symbol,
          quantity,
          lcdnprice,
          lentryprice,
          lexitprice,
          lslprice,
          scdnprice,
          sentryprice,
          sexitprice,
          sslprice,
        };

        const approve = await swal({
          title: 'Are you sure?',
          text: 'Please confirm to proceed further!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });

        if (approve) {
          add_order(payload);
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
          {['', ...Object.keys(tickStatic)].map((s) => (
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
          disabled={!order.symbol && true}
        />
      </div>
      <div>
        <span>LONG ORDERS</span>
      </div>
      <div>
        <input
          value={order.lprices}
          onChange={onChange}
          placeholder='Condition,Entry,Exit,Stoploss...'
          type='text'
          id='lprices'
          disabled={!order.symbol && true}
        />
      </div>
      <div>
        <span>SHORT ORDERS</span>
      </div>
      <div>
        <input
          value={order.sprices}
          onChange={onChange}
          placeholder='Condition,Entry,Exit,Stoploss...'
          type='text'
          id='sprices'
          disabled={!order.symbol && true}
        />
      </div>
      <div>
        <button onClick={addOrder} type='submit'>
          ADD
        </button>
      </div>
    </section>
  );
};

const normalize = (d, n) => Math.trunc(Math.round(d * 10 ** n)) / 10 ** n;

const resetorder = {
  symbol: '',
  quantity: '',
  lprices: '',
  sprices: '',
};

export default AddOrder;
