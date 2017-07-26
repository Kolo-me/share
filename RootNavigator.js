
'use strict';
import React, { Component } from 'react';
import  {
  Navigator,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  BackAndroid,
  PropTypes,
  Image,
  View
} from 'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import Routes from 'funshare/Routes';
import StyleVars from 'funshare/StyleVars';
import SharedStyles from 'funshare/SharedStyles';


const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1
  },
});



export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    if (this._listeners)
      this._listeners.forEach((listener) => listener.remove());
  }

  onNavWillFocus(route) {

  }


  render() {




    return (
      <Navigator
      ref={(navigator) => this._setNavigatorRef(navigator)}
      initialRoute={this._getInitialRoute()}
      renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
      );
    }

    renderScene(route, navigator) {

      return (
      <View style={styles.sceneContainer}>
      <route.component
      {...route.passProps}
      navigator={navigator}
      back={() => this.back()}
      backToHome={() => this.backToHome()}
      toRoute={(route, args) => this.toRoute(route, args)}
      replaceRoute={(route, args) => this.replaceRoute(route, args)}
      />
      </View>
      )
    }

    back() {
      alert("hi");
      this.navigator.pop();
    }

    backToHome() {
      this.navigator.popToTop();
    }

    toRoute(route, args) {
      if ("string" != typeof route || (route = Routes.get(route, args))) {
        this.navigator.push(route);
      }
    }

    replaceRoute(route, args) {
      if ("string" != typeof route || (route = Routes.get(route, args))) {
        this.navigator.replace(route);
      }
    }

    _getInitialRoute() {
      return Routes.Home();
    }

    _setNavigatorRef(navigator) {
      if (navigator !== this.navigator) {
        this.navigator = navigator;

        if (navigator) {
          this._listeners = [
          navigator.navigationContext.addListener("willfocus", this.onNavWillFocus.bind(this))
          ];
        } else {
          if (this._listeners)
            this._listeners.forEach((listener) => listener.remove());
        }
      }
    }


  }