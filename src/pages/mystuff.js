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
import style from '../styles/common-styles.js';
import IcoButton from 'funshare/src/components/icobutton';
import Loading from 'funshare/src/components/Loading';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height -(deviceWidth/2) ;


export default class mystuff extends Component {

componentDidMount() {
     var self=this;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      self.goToHome1();
      return true;
    });
    self.renderRow(); 
  }
componentWillUnmount(){
  var uid = currentUserGlobal.uid;
      firebase.database()
      .ref('items')
      .child(uid)
      .off('value');
}
  goToAddstuff()
  {
    this.props.replaceRoute(Routes.addstuff())
  }

  renderRow() {
     this.setState({
      isloading: true
    });
    var images= [];

      var self = this; 
      var i = 0;
      var num=null;
      var uid = currentUserGlobal.uid;
      firebase.database()
      .ref('items')
      .child(uid)
      .on('value', function(snapshot){
        var piclinks=[];
        snapshot.forEach(function(childSnapshot) {

          firebase.database()
          .ref('items')
          .child(uid).child(childSnapshot.key).once('value').then(function(snapshot) {
            var iteminfo ={
              piclink: snapshot.val().itemPic,
              desc: snapshot.val().description,
              title: snapshot.val().title,  
              itemkey: snapshot.key,
              itemcategory: snapshot.val().category}
            piclinks.push(iteminfo);
            var ds = self.state.dataSource.cloneWithRows(piclinks);
            self.setState({dataSource: ds,
            isloading:false});
            });      
    });
      self.setState({
      isloading: false
    });
    return piclinks;
    });
}

fuck(desc,piclink,title,key){
  this.props.replaceRoute(Routes.fuck(desc,piclink,title,key));
}
loading = (visible) => {
  this.setState({loading: visible});
}
constructor(props) {
  super(props);
  this.goToHome1 = this.goToHome1.bind(this);
  this.fuck = this.fuck.bind(this);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows([]),
    isloading:false,
  };
}
goToHome1()
{ 
    this.setState({
      isloading: true
    });
  this.props.replaceRoute(Routes.Home1(currentUserGlobal));
}
renderItem(piclinks){
  //alert(piclinks);
  return (
    <View style = {styles.item} >
    <TouchableOpacity
    activeOpacity={ 0.75 }
    onPress={this.fuck.bind(this,piclinks)}
    >
    <View>
    <Image
    style={ styles.image }
    source={{uri: piclinks.piclink}}
    /> 
    <Text numberOfLines={1} style ={{margin:5 , marginLeft:10}}>{piclinks.title}</Text>  
    </View>
    </TouchableOpacity>
    </View>
    );
}
render(){


  const TopNavigation = () => (
  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#00D77F' }}>
  <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
  <TouchableOpacity
  onPress={this.goToHome1.bind(this)}
  style={{flex:1, justifyContent:'center'}}
  >
  <Image 
  source={require('funshare/src/img/arrow.png')}
  style={{width:20, height:20}}
  />

  </TouchableOpacity>
  </View>
 
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
  onPress={this.goToHome1.bind(this)}
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


  <ListView
  initialListSize={2}
  enableEmptySections={true}
  dataSource={this.state.dataSource}
  renderRow={this.renderItem.bind(this)}
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

AppRegistry.registerComponent('mystuff', () => mystuff);