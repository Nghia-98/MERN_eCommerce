import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  totalPages,
  currentPage,
  keyword = '',
  isAdmin = false,
}) => {
  const getFilterUrl = (pageNumber) => {
    const userFilterNoKeyword = `/page/${pageNumber}`;
    const userFilterWithKeyword = `/search/${keyword}/page/${pageNumber}`;
    const adminFilterNoKeyword = `/admin/productlist/page/${pageNumber}`;
    const adminFilterWithKeyword = `/admin/productlist/search/${keyword}/page/${pageNumber}`;

    if (!isAdmin) {
      if (!keyword) {
        return userFilterNoKeyword;
      } else {
        return userFilterWithKeyword;
      }
    } else {
      if (!keyword) {
        return adminFilterNoKeyword;
      } else {
        return adminFilterWithKeyword;
      }
    }
  };
  return totalPages > 1 ? (
    <Pagination>
      {[...Array(totalPages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={getFilterUrl(x + 1)}>
          <Pagination.Item active={x + 1 === currentPage}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null;
};

export default Paginate;
