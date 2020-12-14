import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import AnimatedLoader from 'react-native-animated-loader';
import {Base, Api} from '../../configs/url';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
const numColumns = 4;
import {userData} from '../../configs/setting';
import ToppingModal from '../core/topping.modal.core';
import CartPopup from '../core/cart.core';
export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      waiting: false,
      count: 0,
      username: 'hoanglongit96',
      password: 'admin',
      text: '',
      isLogin: false,
      isLoading: false,
      textStyle: {fontSize: 14, width: 250, marginHorizontal: 5},
      ds: new Array(),
      arrTOPING: [],
    };
  }
  formatData(data, numColumns) {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  }
  componentDidMount() {
    this._loadMenuApi();
    this.props.onLoadAllToppingAction(userData.TOKEN);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadMenuReducers !== this.props.loadMenuReducers) {
      if (this.props.loadMenuReducers) {
        this.setState({ds: Array.from(this.props.loadMenuReducers)}, () =>
          this.setState({isLoading: false}),
        );
        userData.Menu = Array.from(this.props.loadMenuReducers);
      }
    }
    if (prevProps.allToppingReducers !== this.props.allToppingReducers) {
      if (this.props.allToppingReducers) {
        this.setState({arrTOPING: this.props.allToppingReducers});
        userData.Topping = Array.from(this.props.allToppingReducers);
      }
    }
  }
  addDataSourceMenu = (ds) => {
    // let items = Array.apply(null, Array(ds[0].CountTable)).map(
    //   (v, i) => {
    //     return {key: i + 1};
    //   },
    //   );
    //   items.forEach((i) => {
    //     this.ds.push(i);
    //   });
  };
  _loadMenuApi = async () => {
    if (userData.Menu.length == 0) {
      this.setState({isLoading: true});
      await this.props.onLoadMenuAction(userData.TOKEN);
    } else{
      this.setState({ds: userData.Menu});
      this.setState({arrTOPING: userData.Topping});
    }
  };
  renderItem = ({item, index}) => {
    const image = Base + item.FileName;
    // const image = URL.ImagePath + item.FileName;
    // constconsole.log(item.FoodName + '-' + image);
    if (!item) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.setState({isModal: !this.state.isModal});
        }}>
        <FastImage
          removeClippedSubviews={true}
          source={{uri: image}}
          style={{alignContent: 'center', width: 50, height: 50, marginTop: 5}}
        />
        <View>
          <Text
            style={{fontSize: 9, alignContent: 'center', textAlign: 'center'}}>
            {item.FoodName}
          </Text>
        </View>
        <Text
          style={{fontSize: 10, textAlign: 'right', alignContent: 'stretch'}}>
          {item.Price}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
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
            <Title>Menu Món</Title>
          </Body>
          <Right />
        </Header>
          
        <FlatList
          data={this.formatData(this.state.ds, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
          <CartPopup style={styles.cart} />
        </View>
        <ToppingModal
          modalVisible={this.state.isModal}
          arrTOPING={this.state.arrTOPING}
          offModal={() => this.setState({isModal: false})}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  cart: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    // zIndex: 1,
  },
  item: {
    backgroundColor: '#7cff92',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width: '24%',
    height: Dimensions.get('window').width / numColumns, // approximate a square
    zIndex: 0,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
