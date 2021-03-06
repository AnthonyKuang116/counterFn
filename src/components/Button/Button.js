// import React from 'react';

// class Button extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     console.log('Button Constructor');
//   }
//   render() {
//     console.log('Button render');
//     console.log(this.props);
//     const { children, ...rest } = this.props;
//     return <button {...rest}>{children}</button>;
//   }
//   componentDidMount() {
//     console.log('Button componentDidMount');
//   }
//   componentWillUnmount() {
//     console.log('Button componentWillUnmount');
//   }
// }

// export default Button;


import React from 'react';
import { BuyStockContext } from '../context/BuyStock.context';

class Button extends React.Component {
  static contextType = BuyStockContext;
  constructor(props) {
    super(props);
    this.state = {};
    // console.log('Button Constructor');
  }
  render() {
    // console.log('Button render');
    // console.log(this.props);
    console.log('Button Context', this.context);
    const { children, ...rest } = this.props;
    return <button {...rest}>{children}</button>;
  }
  componentDidMount() {
    console.log('Button componentDidMount');
  }
  componentWillUnmount() {
    console.log('Button componentWillUnmount');
    this.unsubscribe();
  }
}

export default Button;