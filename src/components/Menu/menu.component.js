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
import {Base, Api} from '../../configs/url';
import Icon from 'react-native-vector-icons/FontAwesome5';
const numColumns = 4;
import {userData} from '../../configs/setting';
import ToppingModal from '../core/topping.modal.core';
import CartPopup from '../core/cart.core';
import {Sizes} from '@dungdang/react-native-basic';
import {removeUnicode} from '../../extensions/extensions';
export default class MenuMilkTea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      keyword: '', //Chọn Keywordban đầu là rỗng
      selectedCategory: -1, //Chọn loại Category là tất cả
      isLoading: false,
      ds: new Array(),
      arrTOPING: [],
      CatID: -1,
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
    if (userData.Topping.length == 0)
      this.props.onLoadAllToppingAction(userData.TOKEN);
    if (userData.Category.length == 0)
      this.props.onLoadCategoryAction(userData.TOKEN);
    console.log(this.props.route.params);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadMenuReducers !== this.props.loadMenuReducers) {
      if (this.props.loadMenuReducers) {
        let arrData = [];
        let ixTmp = 0;
        let arrTMP = [];
        this.props.loadMenuReducers.map((item) => {
          if (ixTmp <= 20) {
            arrTMP.push(item);
            ixTmp++;
          } else {
            arrData.push(arrTMP);
            arrTMP = [];
            ixTmp = 0;
          }
        });
        console.log(arrData[1]);
        this.setState({ds: Array.from(arrData[1])}, () =>
          this.setState({isLoading: false}),
        );
        userData.Menu = Array.from(this.props.loadMenuReducers);
      }
    }
    if (prevProps.allToppingReducers !== this.props.allToppingReducers) {
      if (this.props.allToppingReducers) {
        this.setState({arrTOPING: this.props.allToppingReducers});
        userData.Topping = Array.from(this.props.allToppingReducers);
        this.setState({isLoading: false});
      }
    }
    // if (prevProps.loadCategoryReducers !== this.props.loadCategoryReducers) {
    //   if (this.props.loadCategoryReducers) {
    //     userData.Category = Array.from(this.props.loadCategoryReducers);
    //     this.setState({isLoading: false});
    //   }
    // }
  }
  addDataSourceMenu = (ds) => {};
  _loadMenuApi = async () => {
    if (userData.Menu.length == 0) {
      this.setState({isLoading: true});
      await this.props.onLoadMenuAction(userData.TOKEN);
    } else {
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
        {/* <FastImage
          removeClippedSubviews={true}
          source={{uri: image}}
          style={{alignContent: 'center', width: 50, height: 50, marginTop: 5}}
        /> */}
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
    const {keyword} = this.state;
    return (
      <>
        <Headers navigation={this.props.navigation} title="Menu món" />
        <View style={{height: 50, backgroundColor: '#333'}}>
          <ScrollView
            style={{height: '100%', marginBottom: 5}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scroll>
            <TouchableOpacity
              style={[
                styles.category,
                this.state.selectedCategory === -1
                  ? {backgroundColor: 'red'}
                  : {backgroundColor: '#f5c858'},
              ]}
              onPress={() => {
                this.setState({
                  selectedCategory: -1,
                  ds: userData.Menu,
                });
              }}>
              <Text style={styles.textCategory}>Tất cả</Text>
            </TouchableOpacity>
            {userData.Category.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.category,
                    this.state.selectedCategory === item.ID
                      ? {backgroundColor: 'red'}
                      : {backgroundColor: '#f5c858'},
                  ]}
                  onPress={() => {
                    this.setState({
                      selectedCategory: item.ID,
                      ds: userData.Menu.filter((x) => x.CatID == item.ID),
                    });
                  }}
                  key={index}>
                  <Text style={styles.textCategory}>{item.Name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{height: 50, backgroundColor: '#333'}}>
          <View
            style={[
              styles.textInput,
              {
                justifyContent: 'space-between',
                flex: 1,
                flexWrap: 'wrap',
                backgroundColor: '#ccffd6',
              },
            ]}>
            <Icon
              name="trash-alt"
              size={Sizes.s35}
              color="#b2b2b2"
              style={{
                marginLeft: 20,
                width: Sizes.s50,
                alignSelf: 'center',
                marginTop: 15,
              }}
              onPress={() => {
                this.setState({keyword: ''});
              }}
            />
            <TextInput
              style={{
                fontSize: Sizes.s35,
                width: '70%',
                height: Sizes.s100,
                textAlign: 'center',
                alignSelf: 'center',
              }}
              placeholder="Bạn muốn tìm gì?"
              onChangeText={(text) => this.setState({keyword: text})}
              value={keyword}
            />
            <Icon
              name="search"
              size={Sizes.s35}
              color="#b2b2b2"
              style={{
                marginRight: 10,
                width: Sizes.s100,
                alignSelf: 'center',
                marginTop: 15,
              }}
              onPress={() => {
                this.setState({
                  ds:
                    this.state.selectedCategory === -1
                      ? userData.Menu.filter((x) =>
                          removeUnicode(x.FoodName).includes(
                            removeUnicode(this.state.keyword),
                          ),
                        )
                      : userData.Menu.filter(
                          (x) =>
                            removeUnicode(x.FoodName).includes(
                              removeUnicode(this.state.keyword),
                            ) && x.CatID == this.state.selectedCategory,
                        ),
                });
              }}
            />
          </View>
        </View>
        <FlatList
          data={this.formatData(this.state.ds, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
          <CartPopup
            style={styles.cart}
            cart={this.props.route?.params?.quantity}
          />
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
  category: {
    margin: 3,
    borderWidth: 1,
    width: 90,
    alignItems: 'center',
    borderRadius: 10,
    height: '90%',
    textAlignVertical: 'center',
    backgroundColor: '#f5c858',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  textCategory: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    marginVertical: 0,
    backgroundColor: 'orange',
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
