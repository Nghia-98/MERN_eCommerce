import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = (props) => {
  const dispatch = useDispatch();

  // Get productID & quantity of product on client route
  const productID = props.match.params.id;

  // console.log(typeof props.location.search); -> ?qty=1 :string
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  // dispatch action to save cartItem to redux state & locastorage (see detail in addToCart function)
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  return <div>Cart Screen</div>;
};

export default CartScreen;
