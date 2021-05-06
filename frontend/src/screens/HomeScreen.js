import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // const { data } = await axios.get('/api/products');
      const { data } = await axios.get('/api/products');
      setProducts(data);

      //console.log(`Resolve of promise: ${JSON.stringify(res)}`);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Lasted Product</h1>
      <Row>
        {products.map((product, index, arr) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
