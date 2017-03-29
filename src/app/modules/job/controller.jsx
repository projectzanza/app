import React from 'react';
import QuickCreateJobContainer from './QuickCreate/container';

class JobController {

  static onQuickCreateSuccess() {
    console.log('created!');
  }

  static quickCreateScene() {
    return (
      <QuickCreateJobContainer onSubmitSuccess={JobController.onQuickCreateSuccess} />
    );
  }
}

export default JobController;
