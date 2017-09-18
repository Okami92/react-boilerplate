// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saySomething } from '../actions';

type Props = {
  message: string,
  saySomething: (msg: string) => string,
};

const SaySomething = ({ message, saySomething }: Props) => (
  <div className="say-hello">
    <h3>{message}</h3>
    <button className="button" onClick={() => saySomething('Hello!')}>
      Say hello
    </button>
  </div>
);

SaySomething.propTypes = {
  message: PropTypes.string.isRequired,
  saySomething: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, { saySomething })(SaySomething);
