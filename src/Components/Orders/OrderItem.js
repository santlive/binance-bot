import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import MoreInfo from './MoreInfo';
import OrderContext from '../../Context/order/orderContext';

const OrderItem = ({ order }) => {
  const orderContext = useContext(OrderContext);

  const { del_order } = orderContext;

  const {
    orderID,
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
    status,
    openTS,
    triggerTS,
    messages,
  } = order;

  const { orderClass, statusClass, statusText } = calcFieldsFn(status);

  return (
    <div className={orderClass}>
      <p>{orderID}</p>
      <p>{symbol}</p>
      <p>{quantity}</p>
      <p>{lcdnprice}</p>
      <p>{lentryprice}</p>
      <p>{lexitprice}</p>
      <p>{lslprice}</p>
      <p>{scdnprice}</p>
      <p>{sentryprice}</p>
      <p>{sexitprice}</p>
      <p>{sslprice}</p>
      <p className={statusClass}>{statusText}</p>
      {['INIT', 'PENDING'].includes(status) ? (
        <i
          onClick={async () => {
            const approve = await swal({
              title: 'Are you sure?',
              text: 'Please confirm to proceed further!',
              icon: 'warning',
              buttons: true,
              dangerMode: true,
            });

            if (approve) del_order(orderID);
          }}
          className='fas fa-trash-alt'
        ></i>
      ) : (
        ''
      )}
      <MoreInfo openTS={openTS} triggerTS={triggerTS} messages={messages} />
    </div>
  );
};

const calcFieldsFn = (status) => {
  let orderClass, statusClass, statusText;
  switch (status) {
    case 'INIT':
      orderClass = 'item order-init';
      statusClass = 'text-init';
      statusText = 'Initialized';
      break;
    case 'PENDING':
      orderClass = 'item order-pending';
      statusClass = 'text-pending';
      statusText = 'Pending';
      break;
    case 'LT':
      orderClass = 'item order-long';
      statusClass = 'text-long';
      statusText = 'Long Triggered!';
      break;
    case 'ST':
      orderClass = 'item order-short';
      statusClass = 'text-short';
      statusText = 'Short Triggered!';
      break;
    case 'ERROR':
      orderClass = 'item order-error';
      statusClass = 'text-error';
      statusText = 'Error!';
      break;
    default:
      break;
  }
  return { orderClass, statusClass, statusText };
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
