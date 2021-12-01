// import React from 'react';
// import Button from '../Button/Button';

// let data = {
//     counter: 1000,
// };
// // UI = React (state)

// function CounterFn({ count, setCount, hideBtn, setHideBtn }) {
//     const addCountHandler = () => {
//         setCount(count + 1);
//     }

//     const countAlertHandler = () => {
//         setTimeout(() => alert(count), 5000);
//     }

//     const showBtnHandler = () => {
//         if(hideBtn === true){
//             setHideBtn(false);
//         }
//         if(hideBtn === false){
//             setHideBtn(true)
//         }
//     }

//     return (
//         <section>
//             <header>Counter:{count}</header>

//             {hideBtn ? (
//                 <Button
//                     className="btn"
//                     onClick={addCountHandler}
//                 >
//                     <h1>ADD</h1>
//                 </Button>
//             ) : null}

//             <Button onClick={showBtnHandler}>Remove/Show Btn Add</Button>
//             <Button onClick={countAlertHandler}>Alert After 5s</Button>
//         </section>
//     );
// }



// /*
// Countr Explaination with setState(HW1):

// I believe the reason why even though we had 3 lines of updates to increase count by one, it will
// only update once the component is unmounted and rendered again.
// */


// export default CounterFn;




import React from 'react';
import Button from '../Button/Button';
import { mystore } from '../../MyRedux/MyRedux';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import {withSubscribe} from '../hoc/withSubscribe';
import { myconnect } from '../../MyReactRedux/MyReactRedux';
import { connect } from 'react-redux';

let data = {
  counter: 1000,
};
// UI = React (state)

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'counter',
      hideBtnAdd: false,
    };
    //this.forceUpdateTest = this.forceUpdateTest.bind(this);

    console.log('Counter constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Counter getDerivedStateFromProps');
    if (props.title !== state.title) {
      //Change in props
      return {
        title: props.title,
      };
    }
    return null; // No change to state
  }
  render() {
    console.log('Counter render');

    return (
      <section>
        {this.props.children}
        <header>
          {/* {this.state.title}:{mystore.getState().value} */}
          {this.state.title}:{this.props.counterValue}

        </header>

        {!this.state.hideBtnAdd ? (
          <Button
            className="btn"
            onClick={() => {
              //HW1  why
              // mystore.dispatch({ type: 'counter/incremented' });
              this.props.handleAdd();
            }}
          >
            Add
          </Button>
        ) : null}
        <Button
          className="btn"
          onClick={() => {
            // mystore.dispatch({ type: 'counter/decremented' });
            this.props.handleSub();
          }}
        >
          Sub
        </Button>

        <Button
          onClick={() => {
            this.setState({ hideBtnAdd: !this.state.hideBtnAdd });
          }}
        >
          Remove/Show Btn Add
        </Button>
        <Button
          onClick={() => {
            // let currentCouter = this.state.counter;
            let currentCounter = this.props.counterValue;
            setTimeout(() => {
              alert(currentCounter); // HW2 alert the recent value using function component
            }, 5000);
          }}
        >
          Alert After 5s
        </Button>
      </section>
    );
  }

  componentDidMount() {
    mystore.subscribe(() => this.forceUpdate());
  }
}

let alertCounter;
export const CounterFn = (props) => {
  const forceUpdate = useForceUpdate();
  const [hideBtnAdd, setHideBtnAdd] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (showAlert === true) {
      alert('counter');
      setShowAlert(false);
    }
  }, [showAlert]);

  // ComponentDidMount
  // React.useEffect(() => {
  //   console.log('useEffect invoked');
  // }, []);

  // ComponentDidUpdate + ComponentDidMount
  // React.useEffect(() => {
  //   console.log('useEffect invoked');
  // });

  // React.useEffect(() => {
  //   return () => {
  //     // ComponentWillUnmount
  //   };
  // }, [XXX]);

  React.useEffect(() => {
    mystore.subscribe(() => {
      forceUpdate();
    });
  }, []);

  return (
    <section>
      {props.children}
      <header>
        {props.title}:{mystore.getState().value}
      </header>

      {!hideBtnAdd ? (
        <Button
          className="btn"
          onClick={() => {
            mystore.dispatch({ type: 'counter/incremented' });
            console.log(mystore.getState());
          }}
        >
          <h1>ADD</h1>
        </Button>
      ) : null}

      <Button
        onClick={() => {
          setHideBtnAdd(!hideBtnAdd);
        }}
      >
        Remove/Show Btn Add
      </Button>
      <Button
        onClick={() => {
          setTimeout(() => {
            setShowAlert(true); // HW2 alert the recent value using function component
          }, 5000);
        }}
      >
        Alert After 5s
      </Button>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    counterValue: state.value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hanldeAdd: () => dispatch({ type: 'COUNTER_ADD' }),
    hanldeSub: () => alert('test'),
  };
};

export default myconnect(mapStateToProps, mapDispatchToProps)(Counter);

// export default withSubscribe(Counter);