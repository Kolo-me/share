'use strict';
import React, { Component } from 'react';
import  {
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  AppRegistry
} from 'react-native';

import Actions from 'funshare/Actions';
import Routes from 'funshare/Routes';
import StyleVars from 'funshare/StyleVars';
import DataStore from 'funshare/DataStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  inputContainer: {
    width: Dimensions.get("window").width - 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    color: StyleVars.Colors.primary,
    fontFamily: StyleVars.Fonts.general,
    fontSize: 16,
    padding: 5
  },
  profilePictureContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: StyleVars.Colors.mediumBackground
  }
});

export default class login extends Component {
  constructor(props) {
    super(props);
    var currentUser = DataStore.getCurrentUser();
    
    this.state = {
      name: currentUser.displayName,
      profilePicture:{uri:currentUser.photoURL} ,
      ms:this.props.user.photoURL,
      prr:this.props.user.photoURL

     //profilePicture:"http://domaingang.com/wp-content/uploads/2012/02/example.png"

   }
   // alert(this.state.profilePicture)
 }
 componentWillMount() {
  Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
  Actions.onboard.completed.listen(this.onOnboardCompleted.bind(this));
}





render(props) {


  return (
    <View style={styles.container}>
    <ScrollView
    keyboardShouldPersistTaps={false}
    automaticallyAdjustContentInsets={false}
    >
    <View style={styles.inputContainer}>
    <TouchableOpacity
    style={styles.profilePictureContainer}
    onPress={() => this.onPressProfilePicture()}
    >
    <Image
           // source={require(this.state.profilePicture)}
             //   source={this.state.profilePicture}
             source={this.state.profilePicture}
             style={styles.profilePicture}
             />
             </TouchableOpacity>
             </View>
             <View style={styles.inputContainer}>
             <TextInput
             style={styles.input}
             value={this.state.name}
             placeholder="Full Name"
             autoFocus={true}
             onChangeText={(name) => this.setState({ name: name })}
             autoCapitalize="words"
             returnKeyType="done"
             />
             </View>
             </ScrollView>
             </View>
             );
}
onPressProfilePicture() {
  var Platform = require('react-native').Platform;
  var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Add a thing to exchange  ',
  customButtons: {
    'Choose Photo from Facebook': 'fb',
  },
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
    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
    
    // or a reference to the platform specific asset location
    if (Platform.OS === 'ios') {
      const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    } else {
      const source = {uri: response.uri, isStatic: true};
    }

    this.setState({

      profilePicture: {
        uri: 'data:image/jpeg;base64,' + response.data, isStatic: true
      }
    });

  }
});
}

onOnboardStarted() {

  Actions.onboard({
    onboarded: true,
    displayName: this.state.name,
    photoURL: this.state.profilePicture
  });
}

onOnboardCompleted() {

  this.props.replaceRoute(Routes.Home());
}

}

AppRegistry.registerComponent('login', () => login);
