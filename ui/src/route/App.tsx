import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

// const Tech = (match: object) => {
//   return <div>Current Route: {match.params.tech}</div>
// };
/**
 *
 * interface Props {
    count?: number;
 * }
 */

export default class App extends Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    this.state = {title: ''};
  }

  async componentDidMount(): Promise<void> {
  }

  async componentWillUnmount(): Promise<void> {
  }


  // async componentDidMount() {
  //   this.setState({
  //     title: "test-title"
  //   });
  // }

  test = () => {
      console.log("haha")
  };

  render(): JSX.Element {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="scala">
              <h1>test</h1>
            </Link>
            <Link to="play">
              <h2>test2</h2>
            </Link>
            <Link to="react">
              <h2>test3</h2>
            </Link>
          </div>
          <h1>tech</h1>
          {/*<Route path="/:tech" component={Tech}/>*/}
        </div>
      </Router>
    );
  }
}