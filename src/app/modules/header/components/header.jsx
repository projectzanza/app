import React from 'react';
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
  authButtons: React.PropTypes.node.isRequired,
  onClickTitle: React.PropTypes.func.isRequired,
};

export default Header;
