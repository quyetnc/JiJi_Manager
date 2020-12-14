import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Headers from '../core/headers.core';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedLoader from 'react-native-animated-loader';
import {Host} from '../../configs/url';
import {userData} from '../../configs/setting';
import {getCurrentDateTime} from '../../extensions/extensions';
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
  Content,
  Card,
  CardItem,
} from 'native-base';
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
      isLoading: true,
      chatDataSource: new Array(),
    };
  }
  componentDidMount() {
    //Kết nối tới Server NODEJS
    this.socket = io(Host + ':3000');
    const user=userData.InformationUser[0];
    //Lưu thông tin Connection ID 
    this.socket.emit('saveInformationUserWithConnectionId',user.FullName,user.ID,user.Username);
    //Nhận dữ liệu khi có tin nhắn gửi đến
    this.socket.on('pm', (msg) => {
      this.setState({chatDataSource: [...this.state.chatDataSource, msg]});
    });
    //Tin nhắn của hàm cũ => không xài hàm dứi này
    this.socket.on('chat message', (msg) => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
    this._onLoadChat();
    this.setState({isLoading: false});
  }
  _pm(){
    this.socket.emit('pm',true,this.state.chatMessage,getCurrentDateTime(),userData.Messenger[userData.Messenger.length-1].SupporterID,userData.InformationUser[0].ID,userData.InformationUser[0].Username);
    this.setState({chatMessage: ''});
  }
  //Gửi lên Server tin nhắn
  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadChatReducers !== this.props.loadChatReducers) {
      if (this.props.loadChatReducers) {
        userData.Messenger=Array.from(this.props.loadChatReducers);
        this.setState({chatDataSource: this.props.loadChatReducers});
        console.log(userData.Messenger[0]);
      }
    }
  }
  _onLoadChat = async () => {
    if (userData.Messenger.length == 0)
      await this.props.onLoadChatAction(userData.TOKEN);
    else {
      this.setState({chatDataSource: userData.Messenger});
    }
  };
  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage) => (
      <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
    ));

    return (
      <>
        <AnimatedLoader
          visible={this.state.isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../res/images/loader.json')}
          animationStyle={{
            width: 100,
            height: 100,
          }}
          speed={1}
        />
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="ios-menu-sharp" />
            </Button>
          </Left>
          <Body>
            <Title>Hỗ trợ</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
            {this.state.chatDataSource.map((item,index) => (
              <View style={item.CreateBy?styles.smsCustomer:styles.smsSupporter} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.nameSupporter}>{item.CreateBy?item.CustomerName:item.SupporterName}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'red',
                    }}>
                    {item.CreateOn.replace('T',' ')}
                  </Text>
                </View>
                <Text>{item.Messenger}</Text>
              </View>
            ))}
         </ScrollView>
          <View style={styles.chatView}>
            <View
              style={[
                styles.chatView,
                {borderRadius: 25, backgroundColor: '#989494'},
              ]}>
              <TextInput
                style={[styles.chatInput]}
                autoCorrect={false}
                placeholder="Nhập tin nhắn ở đây..."
                autoFocus={true}
                returnKeyType="none"
                multiline={true}
                value={this.state.chatMessage}
                onChangeText={(chatMessage) => {
                  this.setState({chatMessage});
                }}
              />
              <TouchableOpacity style={{width: 50}}>
                <Image
                  source={require('../../res/icons/im_placeholder.png')}
                  style={[styles.btnSend, {borderRadius: 10}]}
                />
              </TouchableOpacity>
            </View>
            {/**btn send */}
            <TouchableOpacity style={{width: '15%'}} onPress={()=>this._pm()}>
              <Image
                source={require('../../res/icons/send.png')}
                style={[styles.btnSend, {right: 5, bottom: 5}]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatView: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  chatInput: {
    width: '70%',
    height: 'auto',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btnSend: {
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: 0,
  },
  smsSupporter: {
    backgroundColor: '#e0e0e0',
    width: '80%',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  smsCustomer: {
    backgroundColor: '#0084ff',
    width: '80%',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  nameSupporter: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue',
  },
});
