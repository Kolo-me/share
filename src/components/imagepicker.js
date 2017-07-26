'use strict';
import React from 'react'; 
import{
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import StyleVars from 'funshare/StyleVars';
var ImagePicker = require('react-native-image-picker');
class imagepicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       avatarSource: null
    }
  }
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        onPress={() => this.onPress()}
        style={this.props.style]}
      />
    );
  }

  onPress() {
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
      avatarSource: source

    });
  }
});
  }
}



imagepicker.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default imagepicker;
