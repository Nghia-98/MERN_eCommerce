import { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { Row, Col, ListGroup, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions';
import {
  ORDER_LIST_MY_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
} from '../../constants/orderConstants';

const OrderScreen = (props) => {
  const { location, history, match } = props;
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, success, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (success) {
    // Calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => {
        return acc + Number(item.qty) * item.price;
      }, 0)
    );
  }
  useEffect(() => {
    if (!userInfo && !authToken) {
      history.push(`/login?redirect=${location.pathname}`);
    }

    // declare func embed paypal sdk js on the page
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/config/paypal`
      );

      // create & setup <script> tag to embed PayPal SDK JS on the page
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    // When orderDetails in redux state is emty, not loading and not have err
    if (userInfo && !order && !loading && !error) {
      dispatch(getOrderDetails(orderId));
      return;
    }

    // when orderDetails in redux state !== orderDetails we want display on the page
    if (order && order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
      return;
    }

    // if orderDetails already fine
    if (order && !order.isPaid) {
      // if order not paid
      if (!window.paypal) {
        // if the PayPal SDK Script has not loaded
        addPayPalScript();
      } else {
        // if the PayPal SDK Script has been load
        setSdkReady(true);
      }
    }

    // order paied success -> fetch new orderDetails from server and reset orderPay
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_LIST_MY_RESET });
      dispatch({ type: ORDER_DETAILS_RESET }); // help fetch orderDetails again
    }

    // order updated to delivered -> fetch new orderDetails from server and reset orderDeliver
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_LIST_MY_RESET });
      dispatch({ type: ORDER_DETAILS_RESET }); // help fetch orderDetails again
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    history,
    userInfo,
    order,
    error,
    orderId,
    successPay,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const orderDeliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // when component mounting fist time -> orderDetails.loading === undefined
  // -> we need orderDetails.success === true to show orderDetails on the page
  return error || errorDeliver ? (
    <Message variant='danger'>{error || errorDeliver}</Message>
  ) : loading || !success ? (
    <Loader />
  ) : (
    <>
      <h1>Order</h1>
      <p>
        <strong>Name: </strong>
        {order.user.name}
      </p>
      <p>
        <strong>Email: </strong>{' '}
        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
      </p>
      <p>
        <strong>Order ID: </strong>
        {order._id}
      </p>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} ,{order.shippingAddress.postalCode}{' '}
                ,{order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className='justify-content-start align-items-center'>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {addDecimals(Number(item.qty) * Number(item.price))}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={orderDeliverHandler}
                    >
                      Mark As Deliver
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
