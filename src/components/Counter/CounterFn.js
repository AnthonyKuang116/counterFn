import React from 'react';
import Button from '../Button/Button';

let data = {
    counter: 1000,
};
// UI = React (state)

function CounterFn({ count, setCount, hideBtn, setHideBtn }) {
    const addCountHandler = () => {
        setCount(count + 1);
    }

    const countAlertHandler = () => {
        setTimeout(() => alert(count), 5000);
    }

    const showBtnHandler = () => {
        if(hideBtn === true){
            setHideBtn(false);
        }
        if(hideBtn === false){
            setHideBtn(true)
        }
    }

    return (
        <section>
            <header>Counter:{count}</header>

            {hideBtn ? (
                <Button
                    className="btn"
                    onClick={addCountHandler}
                >
                    <h1>ADD</h1>
                </Button>
            ) : null}

            <Button onClick={showBtnHandler}>Remove/Show Btn Add</Button>
            <Button onClick={countAlertHandler}>Alert After 5s</Button>
        </section>
    );
}



/*
Countr Explaination with setState(HW1):

I believe the reason why even though we had 3 lines of updates to increase count by one, it will
only update once the component is unmounted and rendered again.
*/


export default CounterFn;