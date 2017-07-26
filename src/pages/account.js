'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Login from './login';
import styles from '../styles/common-styles.js';
import firebase from 'firebase';

export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){
    var user = firebase.auth().currentUser;
    this.setState({
      user: user,
      loaded: true
    });


  }

  render(){

    return (
      <View style={styles.container}>

      <View style={styles.body}>
      {
        this.state.user &&
        <View style={styles.body}>
        <View style={page_styles.email_container}>
        <Text style={page_styles.email_text}>{this.state.user.email}</Text>
        </View>
        <View style={page_styles.email_container}>
        <Text style={page_styles.email_text}>{this.state.user.uid}</Text>
        </View>
        <Image
        style={styles.image}
        source={{uri: this.state.user.photoURL}}
        />
        <Button
        text="Logout"
        onpress={this.logout.bind(this)}
        button_styles={styles.primary_button}
        button_text_styles={styles.primary_button_text} />
        </View>
      }
      </View>
      </View>
      );
    }

    logout(){

      AsyncStorage.removeItem('user_data').then(() => {
        firebase.auth().signOut().then(function() {
          alert("Sign-out successful");
        }, function(error) {
          alert("Sign-out failed");
        });
        this.props.navigator.push({
          component: Login
        });
      });

    }

  }

  const page_styles = StyleSheet.create({
    email_container: {
      padding: 20
    },
    email_text: {
      fontSize: 18
    }
  });
