import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saySomething } from '../actions';


class SaySomething extends Component {
  state = {};

  render() {
    const { message, saySomething } = this.props;
    return (
      <div className="say-hello">
        <h3>{message}</h3>
        <button
          className="button"
          onClick={() => saySomething('Hello!')}
        >
          Say hello
        </button>
      </div>
    );
  }
}

SaySomething.propTypes = {
  message: PropTypes.string.isRequired,
  saySomething: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, { saySomething })(SaySomething);
