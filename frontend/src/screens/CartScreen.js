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
import { CART_DELETE_ITEM } from '../constants/cartConstants';

const CartScreen = (props) => {
  const dispatch = useDispatch();

  // Get productID & quantity of product on client route
  const productID = props.match.params.id;

  // console.log(typeof props.location.search); -> ?qty=1 :string
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (productID) => {};

  const checkoutHandler = () => {
    props.history.push('/login?redirect=shipping');
  };

  // dispatch action to save cartItem to redux state & locastorage (see detail in addToCart function)
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is emty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((cartItem, index, arr) => {
              return (
                <ListGroup.Item key={cartItem.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid='true'
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>
                    <Col md={2}>${cartItem.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        style={{ padding: 0 }}
                        as='select'
                        value={cartItem.qty}
                        onChange={(e) =>
                          dispatch(addToCart(cartItem.product, e.target.value))
                        }
                      >
                        {[...Array(cartItem.countInStock)].map(
                          (el, index, arr) => {
                            return (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            );
                          }
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(cartItem.product)}
                      >
                        <i class='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {Number(
                  cartItems.reduce(
                    (acc, item) => Number(acc) + Number(item.qty),
                    0
                  )
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
