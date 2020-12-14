import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
export default class CartPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined
    };
  }
  componentDidMount() {
    
  }
  render() {
    return (
        <View style={[{width:60},this.props.style]}>
            <Text style={{position:'absolute',right:0,top:0,fontWeight:'bold',color:'red',fontSize:18}}>{this.props.cart==undefined?0:this.props.cart}</Text>
            <Image source={require('../../res/images/cart-3.png')} style={{width:50,height:50}}/>
        </View>
    );
  }
}