'use strict';
import React, { Component } from 'react';
import  {
  StyleSheet
} from 'react-native';
import StyleVars from 'funshare/StyleVars';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },

  profilePictureContainer: {
    flex: 1,
    paddingTop:13,
    alignItems: "center",
    justifyContent: "center"
  },
  username:{
    fontSize: 20,
    fontWeight: 'bold' ,
    alignItems: 'center',
    color: 'black'
  },
  backgroundImage:{
    flex:1 ,
    backgroundColor:'white',
    width: null,
    height: null 
  },
  profilepicture:{
    flex:1,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  LogoComponent:{
    alignItems: 'center',
    marginTop:10,
    flex:0.3
  },
  Logo:{
    width: 150,
    height: 75,
    marginBottom: 10
  },
  fLogo: {
    width: 200,
    height: 100,
    marginTop:1
  },
  buttongroup:{
    flex:1,
    paddingTop:50,
  },
  body: {
    flex: 9,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  textinput: {
    color: 'white',

    fontSize: 15,
    flex: 1,
    textAlign: 'left'
  },
  textinputcontainer: {  
    padding:0,
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    marginBottom:5,
    borderColor: '#F5FCFF',
    borderRadius: 5,  
    borderBottomColor: "rgba(255,255,255,0.75)",  
    borderWidth: 0.5,    
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#0485A9',
    fontSize: 16
  },
  primary_button: {

    padding: 15,
    backgroundColor: '#529ecc'
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 14
  },
  image: {
    width: 100,
    height: 100
  }
});
