import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
export default class ChooseDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerMode: null,
    };
  }
  showDatePicker = () => {
  //  this.setState({pickerMode: 'date'});
  };



  async componentDidMount() {
    console.log(this.state.pickerMode);
  }
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
            width: '65%',
            borderRadius: 5,
            paddingLeft: 35,
          },
        ]}>
        <Text
          style={[this.props.styleLabel, {fontWeight: 'bold', fontSize: 17}]}>
          {this.props.label}
        </Text>
        <TouchableOpacity
          style={[this.props.styleLabel, styles.styleLabel]}
          onPress={this.props.showTimePicker?.(1)}>
          <Text
            style={{
              fontSize: 18,
            }}>
            {this.props.time1}
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginLeft: 25}}> - </Text>
        <TouchableOpacity
          style={[this.props.styleLabel, styles.styleLabel]}
          onPress={this.props.showTimePicker?.(2)}>
          <Text
            style={{
              fontSize: 18,
            }}>
            {this.props.time2}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.pickerMode !== null}
          mode={this.state.pickerMode}
          onConfirm={(date)=>this.props.handleConfirm?.(date)}
          onCancel={this.props.hidePicker}
          locale="vi_"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullName: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
  },
  textInput: {
    width: '95%',
  },
  styleLabel: {
    marginLeft: 25,
  },
  viewButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewInfo: {
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
  },
});
