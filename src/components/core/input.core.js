import React, {Component} from 'react';
import {TextInput} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
    };
  }
  async componentDidMount() {}
  render() {
    return (
      <View
        style={[
          this.props.style,
          ,
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: 'auto',
            margin: 2,
            borderRadius: 5,
            paddingLeft: 25,
            alignSelf: 'center',
          },
        ]}>
        <Text
          style={[
            this.props.styleLabel,
            {width: '35%', fontWeight: 'bold', fontSize: 17},
          ]}>
          {this.props.label}
        </Text>
        <TextInput
          secureTextEntry={this.props.type == 'password'}
          defaultValue={this.props.defaultValue}
          onChangeText={this.props.onChangeText}
          editable={this.props.enabled ?? true}
          multiline={this.props.multiline ?? false}
          style={[
            {
              height: '100%',
              width: '65%',
              borderBottomWidth: 1,
              borderRadius: 7,
              fontSize: 18,
            },
          ]}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}
