import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderList } from '../actions/orderActions';
import Meta from '../components/Meta';

const OrderListScreen = (props) => {
  const dispatch = useDispatch();

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    // user logged out
    if (!userInfo && !authToken) {
      props.history.push(`/login?redirect=${props.location.pathname}`);
    }

    // user logged in but not a admin
    if (userInfo && !userInfo.isAdmin) {
      props.history.push('/');
    }

    // user logged in with admin account
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrderList());
    }
  }, [dispatch, props.history, props.location.pathname, authToken, userInfo]);

  return (
    <>
      <Meta title={`Proshop | Admin`} />
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : orders.length === 0 ? (
        <Message>There are no order!</Message>
      ) : (
        <Table striped hover responsive bordered className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant='light'
                        className='btn-sm btn-outline-info'
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
