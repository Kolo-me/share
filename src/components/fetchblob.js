  'use strict';
  import RNTest from 'react-native-testkit'
  import RNFetchBlob from 'react-native-fetch-blob'
  import React from 'react'; 
  import DataStore from 'funshare/DataStore';
  import firebase from 'firebase';

  import{
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image
  } from 'react-native';

  const fs = RNFetchBlob.fs
  const Blob = RNFetchBlob.polyfill.Blob
  const polyfill = RNFetchBlob.polyfill
  window.XMLHttpRequest = polyfill.XMLHttpRequest
  window.Blob = polyfill.Blob

  const { Assert, Comparer, Info, prop } = RNTest
  const dirs = RNFetchBlob.fs.dirs
  const prefix = ((Platform.OS === 'android') ? 'file://' : '')
  const testImageName = `item${Platform.OS}-${new Date()}.png`
  const testFile = null

  function upload1(path,title1,description1,category1){  
  return new Promise((next, error) => {

  testFile=path;
  //var currentUser = DataStore.getCurrentUser();
  var user1 = currentUserGlobal;
  var uid=currentUserGlobal.uid ;
  var userName= currentUserGlobal.displayName;

  let rnfbURI = RNFetchBlob.wrap(testFile);
  console.log("fff0");
  Blob
  .build(rnfbURI, { type : 'image/jpeg;'})
  .then((blob) => {
  // upload image using Firebase SDK
  console.log("fff1");
  var uploadTask = firebase.storage()
  .ref('usersItemss')
  .child(uid)
  .child(Math.random().toString(36).substr(2, 9));
  console.log("fff2");
  uploadTask.put(blob, { contentType : 'image/png' })
  .then((snapshot) => {
  console.log("fff");
  uploadTask.getDownloadURL().then(function(url) {

  console.log("fff",url,userName);
  var uploadTask1 = firebase.database()
  .ref('items')
  .child(uid);


  var itemData = {
  uid: uid,
  description: description1,
  title: title1,
  starCount: 0,
  itemPic: url,
  category:category1,
  username:userName

  };
  var newItemKey = uploadTask1.push(itemData).key
  var updates = {};
  updates['items/' + uid + '/' + newItemKey] = itemData;
  var uploadTask2 = firebase.database()
  .ref('categories').child(category1).child(newItemKey).set(itemData);
  var uploadTask3 = firebase.database()
  .ref('categories').child("swiper-all").child(newItemKey).set(itemData);
  }).catch(function(error) {
  alert("Error-fetchblob");
  throw error;
  });

  }).catch(function(error) {
  alert("please choose another photo");
  throw error;
  });
  }).catch(function(error) {
  alert("Error-fetchblob");
  throw error;
  });
  var ms = "hi";

  next(ms);
  //   alert(this.state.picdata);


  }); 






  }
  function uploadphoto() {
  return new Promise((next, error) => {

  var Platform = require('react-native').Platform;
  var ImagePicker = require('react-native-image-picker');

  // More info on all the options is below in the README...just some common use cases shown here
  var options = {
  title: 'Upload a new Picture ',
  quality:0.8,
  maxWidth:300,
  maxHeight:400,
  storageOptions: {
  skipBackup: true,
  path: 'images'
  }
  };

  /**
  * The first arg is the options object for customization (it can also be null or omitted for default options),
  * The second arg is the callback which sends object: response (more info below in README)
  */
  ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
  console.log('User cancelled image picker');
  }
  else if (response.error) {
  console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
  console.log('User tapped custom button: ', response.customButton);
  }
  else {
  // You can display the image using either data...

  const source1 = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
  const source = {uri: response.uri, isStatic: true};
  // or a reference to the platform specific asset location
  if (Platform.OS === 'ios') {
  const source = {uri: response.uri.replace('file://', ''), isStatic: true};
  } else {
  const source = {uri: response.uri, isStatic: true};
  }



  var picSetup = {
  base64: 'data:image/png;base64,'+response.data,
  picPath:  response.path,

  source: {uri: response.uri, isStatic: true},



  };

  next(picSetup);

  // this.upload1(response.path);
  // alert(response.uri);

  //this.upload1();
  //  Actions.onboard.started();

  }
  });

  });   
  }


  export default {
  upload1,
  uploadphoto
  }

