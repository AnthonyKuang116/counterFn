import React from "react";
import {mystore} from "../../MyRedux/MyRedux"

export const withSubscribe = (WrapperComponent) => {

    componentDidMount() {
        mystore.subscribe(() => this.forceUpdate())
    }


    return class NewComponent extends React.Component {
        render() {
            return <WrapperComponent {...this.props}></WrapperComponent>
        }
    }
}