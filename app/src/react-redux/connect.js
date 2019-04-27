import React from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (wrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextType = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { store } = this.context;
      // 当前状态 update 后, 放入监听器中, 用于下一次的更新(每次 dispatch 后会执行 subscribe 中的所有函数) 
      store.subscribe(() => this.update());
      this.update();
    }
    update() {
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState());
      // const dispatchProps = bin
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,

        }
      })
    }
    render() {
      return <wrapComponent {...this.state.props} />
    }
  }
}