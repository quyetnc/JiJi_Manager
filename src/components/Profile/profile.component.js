import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Headers from '../core/headers.core';
import Button from '../core/button.core';
import Input from '../core/input.core';
import ChooseDate from '../core/choosedate.core';
import {Base, Api} from '../../configs/url';
import Icon from 'react-native-vector-icons/FontAwesome5';
const numColumns = 4;
import {userData} from '../../configs/setting';
import {Sizes} from '@dungdang/react-native-basic';
import {removeUnicode} from '../../extensions/extensions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: {},
      time1: '00:00',
      time2: '10:00',
      time: 'time1',
      pickerMode: null,
    };
  }
  async componentDidMount() {
    await this.setState({User: userData.InformationUser[0]});
    console.log(userData.InformationUser);
  }
  handleConfirm = (date = new Date()) => {
    if (this.state.time === 'time1')
      this.setState({time1: date.toLocaleTimeString()});
    else this.setState({time2: date.toLocaleTimeString()});
    this.setState({pickerMode: null});
  };
  componentDidUpdate(prevProps) {}
  render() {
    return (
      <>
        <Headers navigation={this.props.navigation} title="Trang cá nhân" />
        <ScrollView>
          <View>
            <Text style={styles.fullName}>{this.state.User.FullName}</Text>
            <Image
              source={require('../../res/images/long-dep-trai.jpg')}
              style={styles.avatar}
            />
          </View>
          <View style={styles.viewInfo}>
            <Input
              label="Tên cửa hàng: "
              style={styles.textInput}
              styleLabel={styles.styleLabel}
              multiline={true}
              defaultValue={this.state.User.FullName}
            />
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
                style={[
                  this.props.styleLabel,
                  {fontWeight: 'bold', fontSize: 17},
                ]}>
                Giờ hoạt động:
              </Text>
              <TouchableOpacity
                style={[this.props.styleLabel, styles.styleLabel]}
                onPress={() => {
                  this.setState({pickerMode: 'time'});
                  this.setState({time: 'time1'});
                  console.log('avx');
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
                  }}>
                  {this.state.time1}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 20, marginLeft: 20}}> - </Text>
              <TouchableOpacity
                style={[this.props.styleLabel, styles.styleLabel]}
                onPress={() => {
                  this.setState({pickerMode: 'time'});
                  this.setState({time: 'time2'});
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 25,
                  }}>
                  {this.state.time2}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={this.state.pickerMode !== null}
                mode={this.state.pickerMode}
                onConfirm={(date = new Date()) => {
                  this.handleConfirm(date);
                }}
                onCancel={() => {
                  this.setState({pickerMode: null});
                }}
                locale="vi_"
              />
            </View>
            <Input style={styles.textInput} />
            <Input style={styles.textInput} />
          </View>
          <View style={styles.viewButton}>
            <Button text="Lưu" type="primary" style={{marginRight: 10}} />
            <Button text="Thoát" type="dark" />
          </View>
        </ScrollView>
      </>
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
  styleLabel: {},
  viewButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#7cff92',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width: '24%',
    height: Dimensions.get('window').width / numColumns, // approximate a square
    zIndex: 0,
  },
  viewInfo: {
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
  },
});
