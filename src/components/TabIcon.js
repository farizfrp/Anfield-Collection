import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {  Icon } from 'native-base';
const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: '',
};

const TabIcon = props => <Icon name={props.title} style={{fontSize: 20, color: props.focused ? 'red' : 'black' }}/>;

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
