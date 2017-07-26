'use strict';
 import React, { Component } from 'react';
 import  {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import Routes from 'funshare/Routes';
import Reflux from 'reflux';
import DataStore from 'funshare/DataStore';
import Actions from 'funshare/Actions';
import Signup from './src/pages/signup';
import Account from './src/pages/account';
import * as firebase from 'firebase';
import RootNavigator from 'funshare/RootNavigator';
import styles from './src/styles/common-styles.js';
import RNFetchBlob from 'react-native-fetch-blob';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzt6PA0xNFPWo7GiZL1HFkbw7U77-B9_M",
  authDomain: "funshare-c6017.firebaseapp.com",
  databaseURL: "https://funshare-c6017.firebaseio.com",
  storageBucket: "funshare-c6017.appspot.com",
};
firebase.initializeApp(firebaseConfig);
class funshare extends Component {
render(){
  return (
   <View style={{flex:1}}>
   <RootNavigator ref="rootNavigator" />
   </View>
   );
 }
}
AppRegistry.registerComponent('funshare', () => funshare);
