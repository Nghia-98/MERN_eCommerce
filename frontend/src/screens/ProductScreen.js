import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form } from 'react-bootstrap';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Meta from '../components/Meta';
import {
  getProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = (props) => {
  const location = useLocation();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReviewCreate,
    success: successProductReviewCreate,
  } = productReviewCreate;

  // dispatch getProductDetails Action
  // to fetch single product from server and save in redux state (loading, error, product)
  useEffect(() => {
    if (successProductReviewCreate) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getProductDetails(props.match.params.id));
  }, [dispatch, props.match, successProductReviewCreate]);

  const AddToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(props.match.params.id, {
        rating,
        comment,
      })
    );
  };

  const loginToReviewHandler = () => {
    // console.log('location \n', location);
    props.history.push(`/login?redirect=${location.pathname}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={`${product.name}`} />
          <div
            className='btn btn-light my-3'
            onClick={() => {
              props.history.goBack();
            }}
          >
            <i className='fas fa-arrow-left'></i> Go Back
          </div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid='true' />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <p className='font-weight-bold'>{product.name}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup fluid='true'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            style={{ padding: 0 }}
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock)].map(
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
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={AddToCartHandler}
                      >
                        Add to card
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {loadingProductReviewCreate && <Loader />}
              {product.reviews.length === 0 && (
                <Message>There are no reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Row>
                      <Col xs={4}>
                        <span className='font-weight-bold'>User</span>:
                      </Col>
                      <Col xs={8}>
                        <strong>{review.name}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <span className='font-weight-bold'>Rating:</span>
                      </Col>
                      <Col xs={8}>
                        <Rating value={review.rating} />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <span className='font-weight-bold'>Create at:</span>
                      </Col>
                      <Col xs={8}>
                        <p className='m-0'>
                          {review.createdAt.substring(0, 10)}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <span className='font-weight-bold'>Review:</span>
                      </Col>
                      <Col xs={12}>
                        <p
                          className='text-body px-1 m-0'
                          style={{ letterSpacing: 'normal' }}
                        >
                          {review.comment}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReviewCreate}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please{' '}
                      <span
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={loginToReviewHandler}
                      >
                        Login
                      </span>{' '}
                      to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
