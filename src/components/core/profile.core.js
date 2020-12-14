import React, {Component} from 'react';
import {View,Image,Text,TouchableOpacity} from 'react-native';
export default class Profile extends Component {
  render() {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: '#defede',
          alignItems: 'flex-start',
        }}>
        <View style={{flexDirection: 'row', flex: 1, paddingLeft: 25}}>
          <Image
            source={require('../../res/images/long-dep-trai.jpg')}
            style={{
              height: 35,
              width: 35,
              borderRadius: 17.5,
              marginTop: 10,
              marginRight: 15,
            }}
          />
          <Text style={{alignContent: 'center', marginTop: 15, color: 'red'}}>
            Hoàng Long
          </Text>
          <TouchableOpacity
            style={{
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 35,
              marginLeft: 35,
              color: 'red',
              textDecorationLine: 'underline line-through',
            }}
            onPress={() => alert('logout')}>
            <Text style={{fontSize: 10}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
