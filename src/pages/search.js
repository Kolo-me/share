'use strict';
import React, { Component } from 'react';
import  {
  AppRegistry,
  Text,
  Slider,
  TextInput,
  View,
  StyleSheet,
  Image,
  MapView,
  ScrollView,
  BackAndroid,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Geocoder from 'react-native-geocoder'; 
import Routes from 'funshare/Routes';
import IcotextButton from 'funshare/src/components/icotextButton'; 
import firebase from 'firebase';
//let app = new Firebase("https://funshare-c6017.firebaseio.com");
import InputButton from 'funshare/src/components/icotextButton';
import IcoButton from 'funshare/src/components/icobutton';
import style from '../styles/common-styles.js';
var Accordion = require('react-native-accordion'); 
var Accordion1 = require('react-native-accordion'); 
var styles = StyleSheet.create({
  button:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor:  '#00D77F',
  },
  buttontext:{
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  text:{
    fontSize:15,
    fontWeight:'bold'
  },
  slider: {
    height: 10,
    margin: 10,
  },

});

var header=
(
  <View style={{flex:1 ,flexDirection:"row"}}>
  <View style = {{marginRight:15}}>
  <Image

  source={require('funshare/src/img/category.jpg')}

  style = {{width:25, height:25, marginRight:15}}
  />
  </View>
  <Text style={{fontSize:18, fontWeight:"bold"}}>KATEGORIE AUSWÄHLEN</Text>
  </View>
  );

var header1=
(
  <View style={{flex:1 , flexDirection:"row"}}>
  <View style = {{marginRight:15}}>
  <Image

  source={require('funshare/src/img/lupe.png')}
  style = {{width:25, height:25, marginRight:15}}
  />
  </View>
  <Text style={{fontSize:18, fontWeight:"bold"}}>SCHLAGWORTSUCHE</Text>
  </View>

  );
export default class setting extends Component {
  componentDidMount(){
 
    var self=this;
    BackAndroid.addEventListener('hardwareBackPress', () => {

      self.props.replaceRoute(Routes.setting());
      return true;

    });

  }
  watchID: ?number = null;
  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }

  constructor(props) {

    super(props);
    this.state = {  
      initialPosition: 'unknown', lastPosition: 'unknown', 
      falseSwitchIsOn:false,
      picPath1:null,
      open:false,
      open1:false,
      category: "swiper-all",
      slideCompletionValue: 0,
      slideCompletionCount: 0,
      searchtext:null

    }
  }
  _onInputButtonPressed(a,b) {

    this.setState({
      category:a,
      srcc:b,
      open:false

    });
  }
  goToSetting()
  {
    this.props.replaceRoute(Routes.setting());
  }
  change(){

  }
  finish(){
    if(this.state.category){
      var category=this.state.category;
      var search = this.state.searchtext;
      this.props.replaceRoute(Routes.Home(category ,search,1));               
  }
 }     



  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344 
    dist= dist.toFixed(4)
//if (unit=="K") { dist = dist * 1.609344 }
//if (unit=="N") { dist = dist * 0.8684 }
//alert (dist)
}

render() {

  const TopNavigation = () => (
    <View style={{ padding: 8, flexDirection: 'row', backgroundColor: '#00D77F' }}>
    <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
    <TouchableOpacity
    onPress={this.goToSetting.bind(this)}
    >
    <Image 
    source={require('funshare/src/img/arrow.png')}
    style={{width:20, height:20}}
    />

    </TouchableOpacity>
    </View>
     
    <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' , margin:5  }}>
    <Image
    source={require('funshare/src/img/ilupe.png')}
    style={{width:32, height:32}}
    />
    </View>

 
   <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
   
    </View>
 
    </View>
    );

    var issellected ={ 
      flex: 0.5 ,
      flexDirection: "row",
      backgroundColor: '#00D77F',
      borderRadius:3,
      margin:7 ,

    }  ;
    var category = (
    <View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Alles"}
    container={this.state.category =="swiper-all" ? issellected : null}
    source={require('funshare/src/img/categories/all.png')}
    onPress={this._onInputButtonPressed.bind(this,"swiper-all","funshare/src/img/categories/hotswop.png")}
    />
    <InputButton
    value={"Hotswop"}
    container={this.state.category =="hotswop" ? issellected : null}
    source={require('funshare/src/img/categories/hotswop.png')}
    onPress={this._onInputButtonPressed.bind(this,"hotswop","funshare/src/img/categories/hotswop.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Design"}
    container={this.state.category =="design" ? issellected : null}
    source={require('funshare/src/img/categories/design.png')}
    onPress={this._onInputButtonPressed.bind(this,"design","funshare/src/img/categories/design.png")}
    />
    <InputButton
    value={"Family"}
    container={this.state.category =="family" ? issellected : null}
    source={require('funshare/src/img/categories/family.png')}
    onPress={this._onInputButtonPressed.bind(this, "family","funshare/src/img/categories/family.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Events"}
    container={this.state.category =="events" ? issellected : null}
    source={require('funshare/src/img/categories/events.png')}
    onPress={this._onInputButtonPressed.bind(this,"events","funshare/src/img/categories/events.png")}
    />
    <InputButton
    value={"Fashion"}
    container={this.state.category =="fashion" ? issellected : null}
    source={require('funshare/src/img/categories/fashion.png')}
    onPress={this._onInputButtonPressed.bind(this, "fashion","funshare/src/img/categories/fashion.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Green"}
    container={this.state.category =="green" ? issellected : null}
    source={require('funshare/src/img/categories/green.png')}
    onPress={this._onInputButtonPressed.bind(this,"green","funshare/src/img/categories/green.png")}
    />
    <InputButton
    value={"Food"}
    container={this.state.category =="food" ? issellected : null}
    source={require('funshare/src/img/categories/food.png')}
    onPress={this._onInputButtonPressed.bind(this, "food","funshare/src/img/categories/food.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Mashine"}
    container={this.state.category =="mashine" ? issellected : null}
    source={require('funshare/src/img/categories/mashine.png')}
    onPress={this._onInputButtonPressed.bind(this,"mashine","funshare/src/img/categories/mashine.png")}
    />
    <InputButton
    value={"Musik"}
    container={this.state.category =="musik" ? issellected : null}
    source={require('funshare/src/img/categories/musik.png')}
    onPress={this._onInputButtonPressed.bind(this, "musik","funshare/src/img/categories/musik.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Hipster"}
    container={this.state.category =="mustache" ? issellected : null}
    source={require('funshare/src/img/categories/mustache.png')}
    onPress={this._onInputButtonPressed.bind(this,"mustache","funshare/src/img/categories/mustache.png")}
    />
    <InputButton
    value={"Trödel"}
    source={require('funshare/src/img/categories/trodel.png')}
    container={this.state.category =="trödel" ? issellected : null}
    onPress={this._onInputButtonPressed.bind(this, "trödel","funshare/src/img/categories/trodel.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Vintage"}
    container={this.state.category =="vintage" ? issellected : null}
    source={require('funshare/src/img/categories/vintage.png')}
    onPress={this._onInputButtonPressed.bind(this,"vintage","funshare/src/img/categories/vintage.png")}
    />
    <InputButton
    value={"Over18"}
    container={this.state.category =="over18" ? issellected : null}
    source={require('funshare/src/img/categories/over18.png')}
    onPress={this._onInputButtonPressed.bind(this, "over18","funshare/src/img/categories/over18.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Sammler"}
    container={this.state.category =="sammler" ? issellected : null}
    source={require('funshare/src/img/categories/sammler.png')}
    onPress={this._onInputButtonPressed.bind(this,"sammler","funshare/src/img/categories/sammler.png")}
    />
    <InputButton
    value={"Sport"}
    container={this.state.category =="sport" ? issellected : null}
    source={require('funshare/src/img/categories/sport.png')}
    onPress={this._onInputButtonPressed.bind(this, "sport","funshare/src/img/categories/sport.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Technik"}
    container={this.state.category =="technic" ? issellected : null}
    source={require('funshare/src/img/categories/technic.png')}
    onPress={this._onInputButtonPressed.bind(this,"technic","funshare/src/img/categories/technic.png")}
    />
    <InputButton
    value={"Travel"}
    container={this.state.category =="travel" ? issellected : null}
    source={require('funshare/src/img/categories/travel.png')}
    onPress={this._onInputButtonPressed.bind(this, "travel","funshare/src/img/categories/travel.png")}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <InputButton
    value={"Campus"}
    container={this.state.category =="campus" ? issellected : null}
    source={require('funshare/src/img/categories/campus.png')}
    onPress={this._onInputButtonPressed.bind(this, "campus","funshare/src/img/categories/campus.png")}
    />
    <InputButton
    withoutlike={true}
    container={{flex: 0.5 ,
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius:3,
        margin:7 ,
        }}
    />
    </View>

    </View>
    );
    var schlagwort= (
    <View style={{flex:1,margin:15}}>

    <Text style={{fontWeight:'bold', fontSize:10}}>Du weißt wonach du suchst, dann nutze die Schlagwortsuche.</Text>

    <View style ={{  padding:0,
      marginTop:5,
      marginBottom:5,
      borderColor: 'green',
      borderRadius: 5,
      borderWidth: 0.5, }} >  
      <TextInput
      placeholder="z.B. Canon Spiegelreflexkamera"
      onChangeText={(text) => this.setState({searchtext: text})}
      placeholderTextColor= '#a9a9a9'
      selectionColor='#6495ed'
      autoCapitalize="none"
      autoCorrect={false}
      underlineColorAndroid="transparent"  
      />
      </View>
      </View>);

      return (



      <View
      style = {style.backgroundImage}
      >

      <TopNavigation/>
      <ScrollView style={{ flex:1 }}>
     <View style ={{ flex:1  , marginBottom:5 , marginTop:15}}>
      <Accordion
      style={{flex:1}}
      header={header}
      onPress={this.change.bind(this)}
      content={category}
      activeOpacity= {0}
      />
      </View>


      <View style= {{flex:5,marginBottom: 50 , backgroundColor:'#fff'}}>
      <Accordion
      style={{flex:1}}
      header={header1}
      onPress={this.change.bind(this)}
      content={schlagwort}
      easing="easeOutCubic"
      />
      </View>
  





      </ScrollView>

      <TouchableOpacity
      style={styles.button}
      onPress={this.finish.bind(this)}
      >
      <Text style={styles.buttontext}>Anwenden</Text>
      </TouchableOpacity>
      </View>
      );
    }
  }

  AppRegistry.registerComponent('setting', () => setting);