import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductEditScreen = () => {
  return (
    <>
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>Products Manager</h1>
          </Col>
          <Col>
            <ToastContainer position='top-right' autoClose={3000} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductEditScreen;
