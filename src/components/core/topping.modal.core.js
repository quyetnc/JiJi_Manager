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
import {TextInput} from 'react-native-gesture-handler';
import {ToVND} from '../../extensions/extensions';
class ToppingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dsTOPING: new Array(),
      quantity: 10,
    };
  }

  setModalVisible = (visible) => {};
  componentDidMount() {
    this.setState({dsTOPING: Array.from(this.props.arrTOPING)});
  }
  componentDidUpdate(prevProps) {
    if (prevProps.arrTOPING !== this.props.arrTOPING) {
      this.setState({dsTOPING: Array.from(this.props.arrTOPING)});
    }
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
        if (this.state.quantity === 1) {
          return;
        }
        this.setState({quantity: --this.state.quantity});
        break;
      default:
        this.setState({quantity: ++this.state.quantity});
        break;
    }
  };
  _onChangeText = (quantity) => {
    if (!isNaN(quantity)) {
      this.setState({quantity: quantity});
    }
  };
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
            height: '100%',
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
                Chọn thêm <Text style={{color: 'red'}}>Topping</Text> cho đậm đà
                nè
              </Text>
            </View>
            <View style={{flex: 1, flexGrow: 1, padding: 10}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                {this.state.dsTOPING.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 45,
                        backgroundColor: '#cae68e',
                        padding: 5,
                        marginBottom: 10,
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      key={index}>
                      <View
                        style={{
                          width: '87%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                          }}>
                          {item.ToppingName}
                        </Text>
                        <Text style={{marginRight: 8, fontWeight: 'bold'}}>
                          {ToVND(item.Price)}{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={{height: '25%', alignItems: 'center'}}>
                <View
                  style={{
                    height: '50%',
                    flex: 1,
                    flexWrap: 'wrap',
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: '#e35c0e',
                  }}>
                  <TouchableOpacity
                    onPress={() => this._changQuantity(0)}
                    style={{
                      width: 40,
                      height: '100%',
                      borderColor: 'red',
                      borderRightWidth: 2,
                      borderRadius: 7,
                    }}>
                    <Image
                      source={require('../../res/icons/icon_DOWN.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>
                  <TextInput
                    autoFocus={true}
                    defaultValue="1"
                    keyboardType="numeric"
                    onChangeText={(quantity) => {
                      this._onChangeText(quantity);
                    }}
                    value={quantity.toString()}
                    style={{
                      alignContent: 'center',
                      color: '#333',
                      width: 40,
                      height: '100%',
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                    textAlignVertical="center"
                    textAlign="center"
                  />
                  <TouchableOpacity
                    onPress={() => this._changQuantity(1)}
                    style={{
                      width: 40,
                      height: '100%',
                      borderColor: 'red',
                      borderLeftWidth: 2,
                      borderRadius: 7,
                    }}>
                    <Image
                      source={require('../../res/icons/icon_UP.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.offModal()}
                    style={{
                      width: '45%',
                      height: '95%',
                      backgroundColor: '#40f78a',
                      paddingHorizontal: 40,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      Gọi món
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.offModal()}
                    style={{
                      width: '45%',
                      height: '95%',
                      backgroundColor: 'grey',
                      paddingHorizontal: 40,
                      borderRadius: 15,
                      color: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Image
                      source={require('../../res/icons/ic_cancel.png')}
                      style={styles.icons}
                    />
                    <Text>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
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

export default ToppingModal;
