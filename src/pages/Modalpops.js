'use strict';

import React , {Component} from 'react';

import {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  BackAndroid,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from'react-native';
import IcoButton from 'funshare/src/components/icobutton';
import Swiper from 'react-native-swiper';
import Routes from 'funshare/Routes';
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var modalheight = Dimensions.get('window').height/2 ;
var deal = global.AcceptedNotifNumberGlobal>1 ? "Deals": "Deal";
export default class Modalpop extends Component { 
  

 
 


  render() {
    return (
      <Modal
      animationType={"fade"}
      transparent={true}
      visible={this.props.popVisible}
      onRequestClose= {this.props.PopUnvisible}
    >

    <View style={ {flex:1} }>

    <View style= {{justifyContent:'center', alignItems:'center', height:deviceHeight, backgroundColor:   'rgba(0, 0, 0, 0.6)'}} >

    <View style = {{width:deviceWidth-10,height:160 ,backgroundColor: '#FF5C7E' , borderRadius:5}}>
        <View style = {{alignItems:'center' , marginTop:10}}>
        <Image 
        resizeMode={Image.resizeMode.contain}
        source={require('../img/Logo.png')}
        style={{height:40, width:40}}                                
        />
        </View>
        <View style= {{alignItems:'center', marginBottom:15}} >
            <Text style={{color:'white', fontSize:30}}>Glückwunsch</Text>
            <Text style={{color:'white', fontSize:15}}>Du hast {global.AcceptedNotifNumberGlobal} neuen {deal} </Text>
        </View>
        <View style= {{flex:1,borderColor:'white',flexDirection:'row', borderTopWidth:0.7 ,alignItems:'center',justifyContent:'center' }}>
         
         <View style = {{flex:0.5 ,borderColor:'white',borderRightWidth:0.5,alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            onPress={this.props.PopUnvisible}
            style={{flex:1,borderColor:'white', justifyContent:'center',backgroundColor:'#FF5C7E' }}>
            <Text style={{color:'white', fontSize:15}}>Weitersuchen</Text>
            </TouchableOpacity>
            </View>
          <View style = {{flex:0.5 ,alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            onPress={this.props.goTochatscreen}
            style={{flex:1,justifyContent:'center', backgroundColor:'#FF5C7E' }}>
            <Text style={{color:'white', fontSize:15}}>Jetzt ansehen</Text>
            </TouchableOpacity>
            </View>
            </View>
  
    </View>
    </View>
    </View>
    </Modal>

        );
      }
    }