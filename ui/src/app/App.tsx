import React, {Component} from 'react';
import Home from "../components/home/Home";

interface AppState {
    title: String,
    times: number
}

export default class App extends Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            title: '',
            times: 0
        };
    }

    async componentWillMount(): Promise<void> {
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            title: "АУЄ",
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