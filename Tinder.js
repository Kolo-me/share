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
import SwipeCards from 'react-native-swipe-cards';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import Routes from 'funshare/Routes';
import Loading from 'funshare/src/components/Loading';
import ModalExample from 'funshare/src/pages/ModalExample';
import ImageViewer from 'react-native-image-zoom-viewer';
var deviceheight = Dimensions.get('window').height/(3/2)  ;
var deviceWidth = Dimensions.get('window').width-30  ;
var modalheight = Dimensions.get('window').height/2 ;
var Cards = [];
const imagesViewer = [];
var currentLikedItem = null;
let NoMoreCards = React.createClass({
  getInitialState () {
        return {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          visible: false,
          title:"this.props.info.title",
          desc:"this.props.info.description",
          piclink:"this.props.info.image",
          goback:"this.props.info.goback",
          username:"this.props.info.username",
          uidOfLikedItem:"this.props.info.uidOfLikedItem",
          keyOfWantedItem:"this.props.info.keyOfWantedItem",
          category:"this.props.info.category",
          search:"this.props.info.search",
          offerData:null,
          modalVisible:false
        };
      },
  render() {

    return (
      <View style={styles.noMoreCards}>
       <Text style = {{fontSize:19 ,  textAlign: 'center',}}>Diese Kategorie enthält noch keine Objekte, bitte versuche es mit einer anderen Kategorie</Text>
      </View>
      )
  }
})



const Cards2 = [

]

export default React.createClass({

  Card(x) {

    currentLikedItem=x;

     return (
      <View key= {x} style= {{flex:1 , justifyContent:'center'}}>
      <View style={styles.card}>
      <TouchableOpacity
      style= {{flex:1,width:deviceWidth, height:deviceheight-40 }}
      onPress={() => this.goToDetails(currentLikedItem)}
      >
   
      <Image style={styles.thumbnail} resizeMode={Image.resizeMode.cover} source={{uri: x.image}}>
      </Image>
    
      </TouchableOpacity>
      <View style={{marginLeft:10, marginRight:10,justifyContent:'center', height:40, flexDirection:'row' }}>
      <View style={{flex:1 ,justifyContent:'center', }}>
      <Text numberOfLines={1} style={{fontSize:14, fontWeight:'bold', color:'#444'}}>{x.title} </Text>
      </View>
      <View  style = {{flex:1,alignItems:"flex-end" ,justifyContent:'center', }} >
      <Text style={{fontSize:14, fontWeight:'300', color:'#444'}}>{x.username} </Text>
      </View>
      </View>
    
      </View>
      <View style={{marginLeft:7,borderRadius:2, marginRight:7,borderWidth:1,borderColor:'#e3e3e3', height:5}}>

      </View>
      <View style={{marginLeft:14, marginRight:14,borderRadius:2,borderWidth:1,borderColor:'#e3e3e3', height:5}}>
      </View>
      </View>
      )
    },
    handleYup (card) {
      this.setModalVisible(true);
    },
    goBack (card) {
       if(card)
      this.refs['swiper']._goToPreviousCard()
    },
    uploadstart(){
      var offerData= this.state.offerData;
      var uidOfOfferingUser= this.state.uidOfOfferingUser;
      var keyOfOfferedItem= this.state.keyOfOfferedItem;
      if(offerData && keyOfOfferedItem && uidOfOfferingUser  )

      { 
        var uploadTask1 = firebase.database()
        .ref('Offers')
        .child(uidOfOfferingUser);
        var offerKey = uploadTask1.push(offerData).key ;
   
        var notificationData = {
          uidOfLikedItem: this.state.uidOfLikedItem,
          keyOfWantedItem: this.state.keyOfWantedItem,
          uidOfOfferingUser: uidOfOfferingUser,
          keyOfOfferedItem: keyOfOfferedItem,
          offerKey:offerKey,
          created:firebase.database.ServerValue.TIMESTAMP,
        }; 
        var uploadTask2 = firebase.database()
        .ref('Notifications')
        .child(this.state.uidOfLikedItem)
        .child('Unseen'); 
        var notificationKey = uploadTask2.push(notificationData).key;
        this.setState({modalVisible: false});
        }
        else
          alert("Es wird kein Artikel angeboten")

    },

    handleNope (card) {
      this.refs['swiper']._goToNextCard() 
    },
    componentDidMount() {
      this._mounted = true;
      this.rami().then((rm) => {
        if (this._mounted){
          this.setState({
          outOfCards: false
        }) 
        }

      });
    },
    componentWillUnmount() {
      this._mounted = false;
      //Cards=[];
    },
    rami(){
    if(this.props.Startsearch)
      {
        global.indexArray= 0;
        Cards=[];
      }
    if(Cards.length==0)
     this.setState({
      loading: true
    });
      var self = this ;
      var ar = [];
       var result = self.props.category ? self.props.category :"swiper-all";
      return new Promise((next, error) => {
        var i = 0;
       // alert(result)
        var num=0;
        firebase.database()
        .ref('categories')
        .child(result)
        .once('value', function(snapshot){
          num =snapshot.numChildren();
          //alert(num);
            if(num == 0)
        {
           self.setState({
              loading:false
            });
            
        }
        else if (num>Cards.length || self.props.Startsearch)
        {
           global.indexArray=0;
           firebase.database()
          .ref('categories')
          .child(result)
          .once('value', function(snapshot){
           snapshot.forEach(function(childSnapshot) {
            firebase.database()
            .ref('categories')
            .child(result).child(childSnapshot.key).once('value').then(function(snapshot) {
              var piclink = snapshot.val().itemPic;
              var desc = snapshot.val().description;
              var title = snapshot.val().title;
              var userofitem = snapshot.val().username;
              var keyOfWantedItem = snapshot.key;
              var uidOfLikedItem=snapshot.val().uid;
              // console.log(uidOfLikedItem);



              var im = {image:piclink ,title:title , description:desc , location:'9' , uidOfLikedItem:uidOfLikedItem,keyOfWantedItem:keyOfWantedItem , username:userofitem }
             if(currentUserGlobal.uid != uidOfLikedItem)
             if(self.props.search&&self.props.search!="")
             {
              var array = self.props.search.split(" ");
              
                var titlearray = im.title.split(" ");

                  for(var j = 0 ; j<titlearray.length; j++)
                    
                  {     
                        var result =false;
                        var titleword = titlearray[j];
                    
                        for (var k = 0 ; k<array.length ; k++)
                        {
                         
                          if(array[k] == titleword)
                            {
                                ar.push(im);
                                
                                result=true;
                                 break;
                                 
                            }
                            
                        }
                    if(result)break;
              }

             }
             else
              ar.push(im);
              

              i++;
              if (i==num){
               
                self.reflectArray(ar).then((rm) => {
                Cards = rm 
                });
                
                var rm = "Rami function is finished";
                next(rm);
              }

            });
          });
         })
       
        }
         
 });
      }); 

    },

    reflectArray(array)
    { if (this._mounted){
        this.setState({loading:false});
      }
       return new Promise((next, error) => {
      let reflect = [];
      for(var i=array.length-1 ; i>= 0 ; i --)
      {
        Cards.push(array[i]);
      }
    })
      next(Cards);
        
    },
    getInitialState() {
      return {
        loading:false,
        cards: Cards,
        outOfCards: false,
        modalVisible:false
      }
    },
 
    cardRemoved (index) {
      console.log(`The index is ${index}`);

      let CARD_REFRESH_LIMIT = 3

      if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
        console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

        if (!this.state.outOfCards) {
          console.log(`Adding ${Cards2.length} more cards`)

          this.setState({
            cards: this.state.cards.concat(Cards2),
            outOfCards: true
          })
        }

      }

    },
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
    },
    addtofavorite (x){
      if(x)
      {
        firebase.database()
        .ref('profiles')
        .child(currentUserGlobal.uid)
        .child('favorite').once("value")
        .then(function(snapshot) {
          var hasName = snapshot.hasChild(x.keyOfWantedItem);
          if (hasName){
           firebase.database()
          .ref('profiles')
          .child(currentUserGlobal.uid)
          .child('favorite').child(x.keyOfWantedItem).remove().then(function(){
             alert("Item removed from favorite Items");
            });
          }
          else {
                  var favData = {
                    keyOfWantedItem: x.keyOfWantedItem,
                    uidOfLikedItem: x.uidOfLikedItem,   
                    created:firebase.database.ServerValue.TIMESTAMP
                  };        
                  var uploadTask = firebase.database()
                  .ref('profiles')
                  .child(currentUserGlobal.uid)
                  .child('favorite')
                  .child(x.keyOfWantedItem);
                  var favoriteKey = uploadTask.set(favData);
                  alert("Item has been added to favorite");
         }    
        });       
      }
    },
    goToDetails(currentLikedItem)
    { 
      var category = this.props.category ? this.props.category : "swiper-all";
      var search = this.props.search ? this.props.search : null ;
        var info = 
        {
          username:currentLikedItem.username,
          description:currentLikedItem.description,
          image:currentLikedItem.image, 
          title:currentLikedItem.title,
          uidOfLikedItem:currentLikedItem.uidOfLikedItem ,
          keyOfWantedItem:currentLikedItem.keyOfWantedItem ,
          category: category,
          search:search
        };
      if (currentLikedItem) 
      this.props.goToDetails(info);
    },

    
    render() {


      return (
      <View style = {{flex:1, alignItems:'center'}} >
        <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this.setModalVisible(false);}}
        >
          <ModalExample info={currentLikedItem} setModalVisible={this.setModalVisible.bind(this, false)} />
          </Modal>
      
      <View style= {{flex:1.1}} >
      

      <SwipeCards

      ref = {'swiper'}
      cards={this.state.cards}
      loop={true}
      containerStyle = {{flex:1,  backgroundColor: 'white',justifyContent:'center', alignItems:'center', marginTop:10}}
      renderCard={(cardData) => this.Card(cardData)}  
      renderNoMoreCards={() => <NoMoreCards />}
      showYup={false}
      showNope={false}
      handleYup={this.handleYup}
      handleNope={this.handleNope}
      //cardRemoved={this.cardRemoved}
      />
      </View>


      <View style = {{ flex:0.2 , justifyContent:'flex-end'}}>
      <View style={{flex : 1 ,flexDirection:'row' ,width:deviceWidth , alignItems:'flex-end'}}>
       <View style={{position:'absolute', bottom:10,width:deviceWidth  ,flex:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={this.goBack }
      source={require('funshare/src/img/back.png')}
      icostyle={{width:45, height:45}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={() => this.handleNope()}
      source={require('funshare/src/img/dislike.png')}
      icostyle={{width:60, height:60}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={() => this.handleYup()}
      source={require('funshare/src/img/like.png')}
      icostyle={{width:60, height:60}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton

      source={require('funshare/src/img/wuncbt.png')}
      onPress={()=>{this.addtofavorite(currentLikedItem)}}
      icostyle={{width:45, height:45}}
      />
      </View>
      </View>
      </View> 

      </View>

      </View>
      )
    }
  })

  const styles = StyleSheet.create({
    card: {

      width: deviceWidth,
      height: deviceheight,
      borderWidth:2,
      borderColor:'#e3e3e3',
      borderRadius:2,
    },
    thumbnail: {
      borderRadius:2,
      flex:1,
      width:deviceWidth, 
      height:deviceheight-50
    },
    text: {
      fontSize: 20,
      padding:10,
    },
    noMoreCards: {
      flex: 1,
      backgroundColor:'white',
      height:deviceheight+10,
      width:deviceWidth,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })