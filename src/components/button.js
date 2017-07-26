'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
  AppRegistry
} from 'react-native';

import StyleVars from 'funshare/StyleVars';

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding:10,
    margin:5,
    overflow: "hidden",
    backgroundColor: '#00D77F'
  },
  buttonText: {
    color: "white",
    fontFamily: StyleVars.Fonts.general,
    fontSize: 14,
    fontWeight: "400"
  }
});

export default class button extends Component {
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onpress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
      );
  }
}
    AppRegistry.registerComponent('button', () => button);
 

