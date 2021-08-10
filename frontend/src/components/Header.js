import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import { logout } from '../actions/userActions';
import { authTokenLogin } from '../actions/authTokenActions';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.authToken);
  const { loading, token } = authToken;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //#region
  // const searchString = location.search; // the string part of URL, after character '?'
  // const searchParams = new URLSearchParams(searchString);
  // const verifyEmailToken = searchParams.has('verifyEmailToken')
  //   ? searchParams.get('verifyEmailToken')
  //   : '';
  //#endregion

  // Only run one time when componentDidMount (Header component render the first time)
  useEffect(() => {
    //#region
    // if (verifyEmailToken) {
    //   // prepare for login and verify email (implement in LoginScreen component)
    //   dispatch(logout());
    //   return;
    // }
    //#endregion

    if (token) {
      dispatch(authTokenLogin(token));
    } else {
      return;
    }
    // eslint-disable-next-line
  }, []);

  const logoutHandler = () => {
    history.push('/');
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {loading && <Loader />}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
