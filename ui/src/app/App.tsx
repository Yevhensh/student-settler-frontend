import React, {Component} from 'react';
import Home from "../components/home/Home";

interface AppState {
    times: number
}

export default class App extends Component<{}, AppState> {
    state: AppState = {
        times: 0
    };

    async componentWillMount(): Promise<void> {
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            times: this.state.times + 1
        });
    }

    async componentWillUnmount(): Promise<void> {
    }

    render(): JSX.Element {
        return (
            <div>
                <Home/>
            </div>
        );
    }
}