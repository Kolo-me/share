'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  BackAndroid,
  ListView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';

import Routes from 'funshare/Routes';
import style from '../styles/common-styles.js';
import IcoButton from 'funshare/src/components/icobutton';
import Loading from 'funshare/src/components/Loading';
import firebase from 'firebase';
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height -(deviceWidth/2) ;
var piclinks=[];

export default class searchresult extends Component {

  componentDidMount() {
    
     var self=this;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      self.goBack();
      return true;

    });
    self.renderRow(); 
   

  }
  goToAddstuff()
  {
    this.props.replaceRoute(Routes.addstuff())
  }

  renderRow() {
    var self = this;
var searchresult =this.state.searchMatches;
 
var images= [];
var num = searchresult.length;
var j = 0;
for(var i = 0 ; i <searchresult.length ; i++)
    { j++;
      var iteminfo = searchresult[i];
    
      images.push(
          <View>
          <TouchableOpacity
          activeOpacity={ 0.75 }
          onPress={self.goToDetails.bind(this,iteminfo)}
          >
          <View>
          <Image
          style={ styles.image }
          source={{uri: iteminfo.piclink}}
          /> 
    
          <Text numberOfLines={1} style ={{margin:5 , marginLeft:10}}>{iteminfo.title}</Text>  
          </View>
          </TouchableOpacity>
          </View>);
    
    }

  if (j==num){

    self.setState({
      dataSource: self.state.dataSource.cloneWithRows(images),
     
    });
    }
  
 
}

goToDetails(searchresult){
  var searchItems = this.state.searchMatches;
  
  this.props.replaceRoute(Routes.details(searchresult.desc ,searchresult.piclink,   searchresult.title, searchresult.uidOfLikedItem ,searchresult.keyOfWantedItem ,searchresult.userofitem , "searchresult" ,searchItems));  
}

loading = (visible) => {
  this.setState({loading: visible});
}
constructor(props) {
  super(props);

  //this.goToHome1 = this.goToHome1.bind(this);
  //this.fuck = this.fuck.bind(this);
  this.state = {
    searchMatches:this.props.searchMatches,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    isloading:false,
  };
}
goBack()
{ 
  this.props.replaceRoute(Routes.search());
}
render(){
   var spinner =  
    ( 
    <ActivityIndicator

      size="large" 
      color="white"/> 
    ) ;

  const TopNavigation = () => (
  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#00D77F' }}>
  <View style={{ flex:0.2 , justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  onPress={this.goBack.bind(this)}
  style={{flex:1, justifyContent:'center'}}
  >
  <Image 
  source={require('funshare/src/img/arrow.png')}
  style={{width:20, height:20}}
  />

  </TouchableOpacity>
  </View>
  <View style={{ flex:0.2}}/>
  <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' , margin:5  }}>
  <Image
  resizeMode={Image.resizeMode.contain}
  source={require('funshare/src/img/MYSTUFF.png')}
  style={{width:35, height:35}}
  />
  </View>

  <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  style={styles.buttonStyle}
  onPress={this.goBack.bind(this)}
  >
  <View style= {{alignItems:'center' , justifyContent:'center'}}>
  <Text style= {{fontSize:20 , fontWeight:'bold' , color:'white'}} >
  Fertig
  </Text>
  </View>
  </TouchableOpacity>

  </View>

  </View>
  );

  return (
  <View
  style = {style.backgroundImage}
  >
  <TopNavigation/>

  <ScrollView style={{ flex:1 }}>
  <View style={styles.container} >



<Loading loading = {this.state.isloading} />


  <ListView
  initialListSize={2}
  dataSource={this.state.dataSource}
  renderRow={(rowData) => <View style = {styles.item} >{rowData}</View>}
  contentContainerStyle={{flex:1, flexWrap:'wrap',flexDirection: 'row',}}/>

  </View>


  </ScrollView>
  <TouchableOpacity
  style={styles.button}
  onPress={this.goToAddstuff.bind(this)}
  >
  <Text style={styles.buttontext}>Neues Objekt erstellen +</Text>
  </TouchableOpacity>
  </View>
  );
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttontext:{
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  item: {

    backgroundColor: 'white',
    width:( deviceWidth / 2)-15,
    height: (deviceheight / 2),
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius:5,
    margin:8,

  },

  edit: {
    position: 'absolute',
    height:10,
    width:10,
    top:0,
    left:0
  },
  button:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor:  '#00D77F',


  },

  image: {

    alignItems: "center",
    justifyContent: "center",
    width: (deviceWidth/2)-17,
    height: (deviceheight/2)-30 ,
    borderRadius:3
  }
});

AppRegistry.registerComponent('searchresult', () => searchresult);