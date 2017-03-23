import React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';


const Header = props =>
  <div className="header">
    <Grid>
      <Row>
        <Col md={8}>
          <h2> Zanza </h2>
        </Col>
        <Col md={4}>
          { props.authButtons }
        </Col>
      </Row>
    </Grid>
  </div>;

Header.propTypes = {
  authButtons: React.PropTypes.node.isRequired,
};

export default Header;
