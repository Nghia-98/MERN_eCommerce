import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { getProductDetails, updateProduct } from '../actions/productActions';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants';

const ProductEditScreen = ({ location, history, match }) => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: '',
    image: '',
    price: 0,
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  const { token: authToken } = useSelector((state) => state.authToken);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    // user logged out
    if (!userInfo && !authToken) {
      history.push(`/login?redirect=${location.pathname}`);
    }

    // user logged in but not a admin
    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }

    if (productUpdateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push('/admin/productlist');
    }

    if (!product.name || product._id !== match.params.id) {
      dispatch(getProductDetails(match.params.id));
    } else {
      setProductData({
        ...productData,
        name: product.name,
        image: product.image,
        price: product.price,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    history,
    match,
    authToken,
    userInfo,
    product,
    productUpdateSuccess,
  ]);

  const productDataOnChangeHandler = (e) => {
    setProductData({
      ...productData,
      // Computed property names (ES2015)
      [e.target.name]: e.target.value,
    });
  };

  const inputFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) setProductData({ ...productData, image: file.name });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const file = document.getElementById('inputFile').files[0];
    console.log('file', file);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_HOST}/api/upload/s3`,
          formData,
          config
        );
        console.log('data.filePath', data.filePath);

        setUploading(false);
        dispatch(
          updateProduct({
            _id: product._id,
            ...productData,
            image: data.filePath,
          })
        );
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    } else {
      dispatch(updateProduct({ _id: product._id, ...productData }));
    }
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
                value={productData.name}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                name='image'
                placeholder='Enter image url'
                value={productData.image}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
              <Form.File
                id='inputFile'
                onChange={inputFileHandler}
                className='mt-2'
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                placeholder='Enter price'
                value={productData.price}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                name='brand'
                placeholder='Enter brand'
                value={productData.brand}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                name='countInStock'
                placeholder='Enter countInStock'
                value={productData.countInStock}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                placeholder='Enter category'
                value={productData.category}
                onChange={productDataOnChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='Enter description'
                value={productData.description}
                onChange={productDataOnChangeHandler}
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
