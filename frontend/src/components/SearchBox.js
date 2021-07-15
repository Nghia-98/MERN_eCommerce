import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchBox = ({ history }) => {
  const location = useLocation();
  const isAdminFilter = location.pathname.includes('/admin/productlist');

  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      isAdminFilter
        ? history.push(`/admin/productlist/search/${keyword}`)
        : history.push(`/search/${keyword}`);
    } else {
      isAdminFilter ? history.push(`/admin/productlist`) : history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p2'>
        SEARCH
      </Button>
    </Form>
  );
};

export default SearchBox;
