import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel as BootstrapPanel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import FilterInput from '../FilterInput/container';

class Panel extends React.Component {
  title() {
    return <h3> { this.props.title } </h3>;
  }

  header() {
    if (this.props.filter) {
      return (
        <Grid>
          <Row>
            <Col md={4}>
              { this.title() }
            </Col>
            <Col md={4} mdOffset={4}>
              <FilterInput onSubmit={this.props.filter} />
            </Col>
          </Row>
        </Grid>
      );
    }
    return this.title();
  }

  render() {
    return (
      <BootstrapPanel header={this.header()} >
        {this.props.children}
      </BootstrapPanel>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  filter: undefined,
};

export default Panel;
