import React, { useReducer } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import {
  ADD_ORDER,
  DEL_ORDER,
  LOAD_TICKSTATIC,
  LOAD_ORDERS,
  UPDATE_ORDER,
} from '../types';

const OrderState = (props) => {
  const initialState = {
    tickStatic: {},
    orders: [],
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const add_order = async (order) => {
    const orderID = Math.round(Math.random() * 10 ** 5);
    const status = 'INIT';
    const openTS = Date.now();
    const messages = [];
    const lentrycoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const lexitcoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const lslcoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const sentrycoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const sexitcoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const sslcoid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const payload = {
      ...order,
      orderID,
      status,
      lentrycoid,
      lexitcoid,
      lslcoid,
      sentrycoid,
      sexitcoid,
      sslcoid,
      messages,
      openTS,
    };
    dispatch({ type: ADD_ORDER, payload });
    //post the order
    axios.post('/order', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const del_order = async (orderID) => {
    try {
      const resp = await axios.delete('/order', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { orderID },
      });
      if (resp.data === 'success') {
        dispatch({ type: DEL_ORDER, payload: orderID });
        swal(
          'Success!',
          `Order ${orderID} has been deleted successfully!`,
          'success'
        );
      }
    } catch (err) {
      swal('Error!', `Error while deleting order ${orderID}: ${err}`, 'error');
    }
  };

  const load_tickstatic = (payload) => {
    dispatch({ type: LOAD_TICKSTATIC, payload });
  };

  const load_orders = (payload) => {
    dispatch({ type: LOAD_ORDERS, payload });
  };

  const update_order = (payload) => {
    dispatch({ type: UPDATE_ORDER, payload });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        tickStatic: state.tickStatic,
        add_order,
        del_order,
        load_tickstatic,
        load_orders,
        update_order,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
