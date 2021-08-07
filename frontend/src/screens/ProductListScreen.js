import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductListScreen = (props) => {
  const { history, match } = props;
  const dispatch = useDispatch();

  const KeywordAdminParam = match.params.keyword || '';
  const pageNumberParam = match.params.pageNumber || 1;

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, currentPage, totalPages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;

  const productCreated = useSelector((state) => state.productCreate);

  const {
    loading: productCreateLoading,
    error: productCreateError,
    success: productCreateSuccess,
    product: productCreate,
  } = productCreated;

  useEffect(() => {
    //user logged out
    if (!userInfo && !authToken) {
      history.push(`/login?redirect=${props.location.pathname}`);
    }

    // user logged in but not a admin
    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }

    if (productDeleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (productCreateSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      toast.success('Product created successfully');
      history.push(`/admin/product/${productCreate._id}/edit`);
    }

    dispatch(
      listProducts({ keyword: KeywordAdminParam, pageNumber: pageNumberParam })
    );
    // eslint-disable-next-line
  }, [
    userInfo,
    dispatch,
    history,
    productDeleteSuccess,
    productCreateSuccess,
    KeywordAdminParam,
    pageNumberParam,
  ]);

  const productCreateHandler = () => {
    dispatch(createProduct());
  };

  const productDeleteHandler = (productId) => {
    if (window.confirm('Are you sure to delete product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <>
      <Meta title={`Proshop | Admin`} />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={productCreateHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading || productDeleteLoading || productCreateLoading ? (
        <Loader />
      ) : error || productDeleteError || productCreateError ? (
        <Message variant='danger'>
          {error || productDeleteError || productCreateError}
        </Message>
      ) : products.length === 0 ? (
        <Message variant='info'>There are no product</Message>
      ) : (
        <>
          <Table striped hover responsive bordered className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/product/${product._id}`}>
                        <Button
                          variant='light'
                          className='btn-sm btn-outline-info mr-1 mb-1'
                        >
                          Details
                        </Button>
                      </LinkContainer>

                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button
                          variant='light'
                          className='btn-sm btn-outline-info mr-1 mb-1'
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant='danger'
                        className='btn-sm mb-1'
                        style={{ borderWidth: '2px' }}
                        onClick={() => productDeleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            keyword={KeywordAdminParam}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
