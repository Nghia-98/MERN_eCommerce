import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  totalPages,
  currentPage,
  keyword = '',
  isAdmin = false,
}) => {
  const isSiblingsPage = (pageNumber) => {
    return (
      pageNumber === currentPage - 1 ||
      pageNumber === currentPage - 2 ||
      pageNumber === currentPage + 1 ||
      pageNumber === currentPage + 2
    );
  };

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

  return (
    // Types of pagination_item we want to show :
    // 1: Paginate action firt, next, prev, last
    // 2: Pages {1} and {totalPages}
    // 3: Page {currentPage}
    // 4: pages {currentPage -1}, {currentPage -2}, {currentPage +1}, {currentPage +2}
    // 5: Pagination.Ellipsis left & right of the currentPage (page {2} & page {totalPages -1})
    // => We will hide any other pages
    <Pagination>
      <LinkContainer key={'first'} to={getFilterUrl(1)}>
        <Pagination.First />
      </LinkContainer>

      <LinkContainer
        key={'prev'}
        to={getFilterUrl(currentPage > 1 ? currentPage - 1 : 1)}
      >
        <Pagination.Prev />
      </LinkContainer>

      {[...Array(totalPages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={getFilterUrl(x + 1)}>
          {x + 1 === 1 || x + 1 === totalPages ? (
            <Pagination.Item active={x + 1 === currentPage}>
              {x + 1}
            </Pagination.Item>
          ) : x + 1 === currentPage ? (
            <Pagination.Item active={true}>{x + 1}</Pagination.Item>
          ) : isSiblingsPage(x + 1) ? (
            <Pagination.Item>{x + 1}</Pagination.Item>
          ) : x + 1 === 2 ? (
            <Pagination.Ellipsis />
          ) : x + 1 === totalPages - 1 ? (
            <Pagination.Ellipsis />
          ) : (
            <div className='d-none'></div>
          )}
        </LinkContainer>
      ))}

      <LinkContainer
        key={'next'}
        to={getFilterUrl(
          currentPage < totalPages ? currentPage + 1 : totalPages
        )}
      >
        <Pagination.Next />
      </LinkContainer>

      <LinkContainer key={'last'} to={getFilterUrl(totalPages)}>
        <Pagination.Last />
      </LinkContainer>
    </Pagination>
  );
};

export default Paginate;
