import React from 'react';
import { Panel } from 'react-bootstrap';

const panelHeader = (<h3>Quick Create Job</h3>);

const QuickCreatePanelContainer = props =>
  (
    <Panel header={panelHeader}>
      {props.children}
    </Panel>
  );

QuickCreatePanelContainer.propTypes = {
  children: React.PropTypes.node,
};

QuickCreatePanelContainer.defaultProps = {
  children: null,
};

export default QuickCreatePanelContainer;
