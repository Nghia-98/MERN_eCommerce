import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { getProductDetails, updateProduct } from '../actions/productActions';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants';

const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: 0,
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
    product: productUpdated,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (productUpdateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push('/admin/productlist');
    }

    if (!product.name || product._id !== match.params.id) {
      dispatch(getProductDetails(match.params.id));
    } else {
      setFormData({
        ...formData,
        name: product.name,
        image: product.image,
        price: product.price,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
    }
  }, [dispatch, history, match, userInfo, product, productUpdateSuccess]);

  const formDataOnChangeHandler = (e) => {
    setFormData({
      ...formData,
      // Computed property names (ES2015)
      [e.target.name]: e.target.value,
    });
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: product._id, ...formData }));
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        <i className='fas fa-arrow-left'></i> Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loading || productUpdateLoading ? (
          <Loader />
        ) : error || productUpdateError ? (
          <Message variant='danger'>{error || productUpdateLoading}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type='text'
                name='name'
                placeholder='Enter name'
                value={formData.name}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                name='image'
                placeholder='Enter image url'
                value={formData.image}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                placeholder='Enter price'
                value={formData.price}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                name='brand'
                placeholder='Enter brand'
                value={formData.brand}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                name='countInStock'
                placeholder='Enter countInStock'
                value={formData.countInStock}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                placeholder='Enter category'
                value={formData.category}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='Enter description'
                value={formData.description}
                onChange={formDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
