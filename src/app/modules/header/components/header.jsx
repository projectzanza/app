import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';


const Header = props =>
  <div className="header">
    <Grid>
      <Row>
        <Col md={8}>
          <h2>
            <Button className="title" bsStyle="link" onClick={e => props.onClickTitle(e)}>
              Zanza
            </Button>
          </h2>
        </Col>
        <Col md={4} className="align-right">
          { props.authButtons }
        </Col>
      </Row>
    </Grid>
  </div>;

Header.propTypes = {
  authButtons: PropTypes.node.isRequired,
  onClickTitle: PropTypes.func.isRequired,
};

export default Header;
