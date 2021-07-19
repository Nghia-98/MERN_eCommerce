import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = ({ match, history }) => {
  const keywordUserParam = match.params.keyword || '';
  const pageNumberParam = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, currentPage, totalPages } = productList;

  useEffect(() => {
    dispatch(
      listProducts({ keyword: keywordUserParam, pageNumber: pageNumberParam })
    );
  }, [dispatch, keywordUserParam, pageNumberParam]);

  return (
    <>
      {!keywordUserParam ? (
        <ProductCarousel />
      ) : (
        <div
          className='btn btn-light'
          onClick={() => {
            history.push('/');
          }}
        >
          <i className='fas fa-arrow-left'></i> Go Back
        </div>
      )}
      <h1>Lasted Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <Message variant='info'>There are no product</Message>
      ) : (
        <>
          <Meta />
          <Row>
            {products.map((product, index, arr) => {
              return (
                <Col
                  className='my-3'
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={product._id}
                >
                  <ProductCard product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            keyword={keywordUserParam}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
