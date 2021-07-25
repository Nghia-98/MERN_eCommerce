import { Row, Col } from 'react-bootstrap';
const NotFoundScreen = ({ history, location }) => {
  return (
    <>
      <Row>
        <Col>
          <h1>
            Page not found with <code>{location.pathname}</code>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className='btn alert-info my-3'
            onClick={() => {
              history.push('/');
            }}
          >
            <i className='fas fa-arrow-left'></i> Home Page
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NotFoundScreen;
