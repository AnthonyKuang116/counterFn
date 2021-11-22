// import './App.css';
// import Counter from './components/Counter/Counter';
import CounterFn from './components/Counter/CounterFn';
import { useEffect, useState } from "react";


function App() {
    const [count, setCount] = useState(0);
    const [hideBtn, setHideBtn] = useState(true);

    useEffect(() => {

    }, [count, hideBtn])

    return <CounterFn {...{ count, setCount, hideBtn, setHideBtn }}></CounterFn>;
}

export default App;
