import React, { Component } from 'react';


class App extends Component {
  state = {
    counter: 2,
  };

  updateCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };


  render() {
    return (
      <div className="app">
        <h1 className="app__heading">Hello World!</h1>
        {this.state.counter}
        <button onClick={this.updateCounter}>Add</button>
      </div>
    );
  }
}


export default App;
