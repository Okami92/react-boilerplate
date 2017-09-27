// @flow
import React, { Component } from 'react';

import SaySomething from './SaySomething';

type State = {
  counter: number,
};

class App extends Component<{}, State> {
  state = {
    counter: 0,
  };

  updateCounter = () => {
    this.setState(prevStat => ({
      counter: prevStat.counter + 1,
    }));
  };

  render() {
    return (
      <div className="app">
        <h1 className="app__heading">Hello World!</h1>
        Counter: {this.state.counter}
        <button className="button" onClick={this.updateCounter}>
          Add
        </button>
        <SaySomething />
      </div>
    );
  }
}

export default App;
