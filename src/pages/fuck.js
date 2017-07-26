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
  TouchableHighlighteOpacity,
  TouchableHighlight
} from'react-native';
import Swiper from 'react-native-swiper';
import Routes from 'funshare/Routes';
import ImageViewer from 'react-native-image-zoom-viewer';
import fetchblob from 'funshare/src/components/fetchblob';
import firebase from 'firebase';
import IcoButton from 'funshare/src/components/icobutton';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var images=[];
var dummypicms=null;
const styles = StyleSheet.create({
 
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  textinput: {
    fontWeight:'bold',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    flex:1
  },
  description: {
    textAlignVertical:'top',
    backgroundColor: 'white',
    alignItems:'flex-start',
    marginTop:0,
    color: 'black',
    fontSize: 15,
    flex: 1,
  },
})
var imagesViewer = [];
export default class fuck extends Component {

  componentDidMount() {
    var self=this;
    BackAndroid.addEventListener('hardwareBackPress', () => {

      self.props.replaceRoute(Routes.mystuff());
      return true;

    });
    //this.setImage();

  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      icategory:this.props.iteminfo.itemcategory,
      title:this.props.iteminfo.title,
      desc:this.props.iteminfo.desc,
      piclink:this.props.iteminfo.piclink,
      dummypic:{uri:this.props.iteminfo.piclink},
      picPath1:null,
      base64:null,
      itemkey:this.props.iteminfo.itemkey,
    }
    
  }
  setImage(){

    imagesViewer= []
    var link = {url: this.state.piclink}
    imagesViewer.push(link)
    var visible = !this.state.visible
    this.setState({visible: visible});
  }


  renderImages(){
    var images ;
    var self =dummypicms;

    images=
    (
      <TouchableOpacity
      activeOpacity={1}  
      onPress = {() => this.setImage()}
      style = {{flex:1}}
      >
      <Image
      style={{flex:1,width:null, height:null}}
      source={this.state.dummypic}>
      <View style= {{position:'absolute',
      alignItems:'center', justifyContent:'center',
      top:5,
      right:5,
      width:60,
      height:60,

    }}>
   
    </View>


    </Image> 
    </TouchableOpacity>
    )
    return images;
  }
  calluploadphoto() {

    fetchblob.uploadphoto().then((picSetup) => {
      dummypicms=picSetup.source;
      this.setState({
        //piclink:picSetup.source,
        dummypic:picSetup.source,  
        picPath1:picSetup.picPath,
        base64:picSetup.base64  
      });  

    }, function(error) {
      alert("can't upload the photo")
    });

  }
  update(){
    if(this.state.title.length>0&&this.state.desc.length>0)
   {
    var uid=currentUserGlobal.uid;
       firebase.database()
       .ref('items').child(uid).child(this.state.itemkey).update({
         "title": this.state.title,
         "description":this.state.desc
       });
       firebase.database()
       .ref('categories').child('swiper-all').child(this.state.itemkey).update({
         "title": this.state.title,
         "description":this.state.desc
       });
       firebase.database()
       .ref('categories').child(this.state.icategory).child(this.state.itemkey).update({
         "title": this.state.title,
         "description":this.state.desc
       }).then(function(){
         alert("New info saved");
       });
     }
      else
     alert("Bitte füllen Sie alle Felder");
  }
  remove(){
    var save=this;
    var uid=currentUserGlobal.uid;
    firebase.database()
    .ref('items').child(uid).child(this.state.itemkey).remove().then(function(){
    });
    firebase.database()
    .ref('categories').child('swiper-all').child(this.state.itemkey).remove().then(function(){
    });
    firebase.database()
    .ref('categories').child(this.state.icategory).child(this.state.itemkey).remove().then(function(){
      save.goBack();
    });
  }
  finish(){

    if(this.state.title &&this.state.picPath1&&this.state.description ){

      fetchblob.upload1(this.state.picPath1,this.state.title,this.state.description,
        this.state.category).then(( ) => {
          save.goBack();
        }, function(error) {
          alert("cann't save")
        });
      }
      else alert("mother sharmootah go add a pic and a title and a description ot i'll come and fuck you"); 
    }

 

    goBack(){
      this.props.replaceRoute(Routes.mystuff());
    }

  

    render() {
      const TopNavigation = () => ( 
        <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>
        <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
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
        
        <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' , margin:5  }}>

        </View>

        <View style={{ flex:0.4 ,flexDirection:'row', alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={this.remove.bind(this)}
        >
        <View style= {{alignItems:'center' , justifyContent:'center'}}>
        <Text style= {{fontSize:15 ,marginRight:9, fontWeight:'bold' , color:'white'}} >
        Delete
        </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={this.update.bind(this)}
        >
        <View style= {{alignItems:'center' , justifyContent:'center'}}>
        <Text style= {{fontSize:15 , fontWeight:'bold' , color:'white'}} >
         Save
        </Text>
        </View>
        </TouchableOpacity>


        </View>

        </View>
        );


        return (

        <View style={{flex:1, backgroundColor:'white'}}>
        <TopNavigation/>
        <ScrollView
        style={{flex:1}}
        >
        
        <Modal visible={this.state.visible} 
        onRequestClose={() => {this.setState({visible:false})}}
        transparent={true}>
        <View style = {{ height:40,
          backgroundColor:   'rgba(0, 0, 0, 1)'}}>
          <View style= {{
            margin:10,
            flexDirection:'row',
          }}>

          <IcoButton
          source={require('funshare/src/img/arrow.png')}
          onPress={()=>{ this.setState({visible:false})}}
          icostyle={{width:20, height:20}}
          />
          </View>
          </View>
          <ImageViewer visible={true} imageUrls={imagesViewer}/>

          </Modal>

          <View style={{height:deviceHeight/1.9-50}}>

          <Swiper style={styles.wrapper}
          height={deviceHeight/1.9}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          >

          {this.renderImages()}



          </Swiper>
          </View>

          <View style= {{ height:(deviceHeight-(deviceHeight/2)-82)}}>
          <View style ={{flex:2, marginTop:0 ,borderBottomWidth:1,  borderColor:'#dcdcdc'}}>


          <TextInput
          onChangeText={(text) => this.setState({title: text})} 
          maxLength={87}
          multiline={true}
          numberOfLines = {2}
          value={this.state.title}
          editable={true} 
          placeholderTextColor= '#a9a9a9'
          selectionColor='#6495ed'
          style={styles.textinput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          underlineColorAndroid="transparent"
          onSubmitEditing={() => this.description.focus()}
          />
          </View>


          <View style ={{flex:6 , marginTop:0 }}>
          <TextInput
          ref={(ref) => this.description = ref}
          onChangeText={(text) => this.setState({desc: text})} 
          value={this.state.desc}
          maxLength={300}
          editable={true}
          placeholderTextColor= '#a9a9a9'
          selectionColor='#6495ed'
          style={styles.description}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
          underlineColorAndroid="transparent"
          />
          </View>
          </View>

          </ScrollView>

          </View>

          );
        }
      }
