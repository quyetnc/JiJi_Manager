import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {userData} from '../../configs/setting';
import Checkbox from 'react-native-custom-checkbox';
import {TextInput} from 'react-native-gesture-handler';
import {ToVND} from '../../extensions/extensions';
class FingerPrintModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dsTOPING: new Array(),
      quantity: 10,
    };
  }

  setModalVisible = (visible) => {};
  componentDidMount() {
   
  }
  componentDidUpdate(prevProps) {
   
  }
  // _loadAllToppingApi = async () => {
  //   if (this.state.ds.length == 0) {
  //     this.setState({isLoading: true});
  //     await this.props.onLoadAllToppingAction(userData.TOKEN);
  //     this.setState({isLoading: false});
  //   }
  // };
  _myFunction = (name, checked) => {};
  _changQuantity = (type = 1) => {
    switch (type) {
      //Increase quantity
      case 1:
        this.setState({quantity: ++this.state.quantity});
        break;
      //Decrease quantity
      case 0:
        if(this.state.quantity === 1) {
          return;
        }
        this.setState({quantity: --this.state.quantity});
        break;
      default:
        this.setState({quantity: ++this.state.quantity});
        break;
    }
  };
  _onChangeText=(quantity) => {
    if(!isNaN(quantity)) {
      this.setState({quantity: quantity })
    }
  }
  render() {
    const {modalVisible} = this.props;
    const {quantity} = this.state;
    return (
      // <View style={[styles.centeredView,modalVisible?{}:{display:'none'}]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            height: '50%',
            width: '100%',
            backgroundColor: '#00000036',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '60%',
              width: '80%',
              backgroundColor: 'white',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <View
              style={{
                height: '10%',
                alignItems: 'center',
                backgroundColor: 'pink',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>
                Vui lòng quét vân tay của bạn
              </Text>
            </View>
            <View style={{flex: 1, flexGrow: 1, padding: 10}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                    <Text>Quét vân tay để xác thực</Text>
                    <Image style={{width: 200, height:200,alignSelf:"center"}} source={require('../../res/icons/fingerprint.png')}/>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    width: 20,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FingerPrintModal;
