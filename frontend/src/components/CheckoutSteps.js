import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({
  step1,
  step2,
  step3,
  step4,
  activeStep2,
  activeStep3,
  activeStep4,
}) => {
  return (
    <Nav className='justify-content-center mb-4 checkout-nav'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='checkout-step'>
              <span>1</span> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='checkout-step step-disabled' disabled>
            <span>1</span> Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link
              className={
                activeStep2 ? 'checkout-step text-underLine' : 'checkout-step'
              }
            >
              <span>2</span> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='checkout-step step-disabled' disabled>
            <span>2</span> Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link
              className={
                activeStep3 ? 'checkout-step text-underLine' : 'checkout-step'
              }
            >
              <span>3</span> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='checkout-step step-disabled' disabled>
            <span>3</span> Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link
              className={
                activeStep4 ? 'checkout-step text-underLine' : 'checkout-step'
              }
            >
              <span>4</span> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='checkout-step step-disabled' disabled>
            <span>4</span> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
