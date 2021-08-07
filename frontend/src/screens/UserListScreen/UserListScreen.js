import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { deleteUser, getListUser } from '../../actions/userActions';
import Meta from '../../components/Meta';

const UserListScreen = (props) => {
  const dispatch = useDispatch();

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: userDeleteLoading,
    error: userDeleteError,
    success: userDeleteSuccess,
  } = userDelete;

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
      dispatch(getListUser());
    }
  }, [
    authToken,
    userInfo,
    userDeleteSuccess,
    dispatch,
    props.history,
    props.location.pathname,
  ]);

  const userDeleteHandler = (userId) => {
    if (window.confirm('Are you sure to delete user?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
      <Meta title={`Proshop | Admin`} />
      <h1>Users</h1>
      {loading || userDeleteLoading ? (
        <Loader />
      ) : error || userDeleteError ? (
        <Message variant='danger'>{error || userDeleteError}</Message>
      ) : (
        <Table striped hover responsive bordered className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`user/${user._id}/edit`}>
                      <Button
                        variant='light'
                        className='btn-sm btn-outline-info mr-1'
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      style={{ borderWidth: '2px' }}
                      onClick={() => userDeleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
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

export default UserListScreen;
