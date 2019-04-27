import React from 'react';
import PropTypes from 'prop-types';

export class Provider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  render() {
    return this.props.children
  }
}