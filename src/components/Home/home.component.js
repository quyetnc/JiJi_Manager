import React, {useState, useEffect} from 'react';
import Headers from '../core/headers.core';
import Button from '../core/button.core';
import {ToVND} from '../../extensions/extensions';
import {userData} from '../../configs/setting';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native';
const numColumns = 4;
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      count: 0,
      text: '',
      selectedTable: 1,
      tableOrdered: [], //Danh sách những bàn đã order
      ds: [],
      ordered: [],
    };
  }
  async componentDidMount() {
    // await this._onGetTotalMoneyOfTable();
    // await this._loadOrderApi();
    // await this._loadFloorApi();
  }
  formatData = (data, numColumns) => {
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
  };
  onClick = async (numTable = 0) => {
    await this.setState({selectedTable: numTable});
  };
  _onGetTotalMoneyOfTable = async () => {
    await this.props.onLoadTotalMoneyByTableAction(userData.TOKEN);
  };
  _doubleClick = async (numTable = 0) => {
    this.onClick(numTable);
    // this.props.navigation.navigate("Menu",{
    //   tableOrdered:numTable,
    //   quantity:4
    // });
  };
  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={[
          styles.item,
          this.state.selectedTable === parseInt(item.key)
            ? {backgroundColor: '#ebff9d'}
            : this.state.tableOrdered.includes(parseInt(item.key))
            ? {backgroundColor: 'red'}
            : {backgroundColor: '#42b72a'},
          ,
        ]}
        onPress={() => this.onClick(item.key)}
        onLongPress={() => this._doubleClick(item.key)}>
        <Image
          source={require('../../res/images/milktea.png')}
          style={{alignContent: 'center', width: 50, height: 50, marginTop: 5}}
        />
        <View>
          <Text>Bàn {item.key}</Text>
        </View>
        <Text
          style={
            ({fontSize: 10, textAlign: 'right', alignContent: 'stretch'},
            item.money === 0 ? {width: 0, height: 0} : {})
          }>
          {ToVND(item.money)}
        </Text>
      </TouchableOpacity>
    );
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.loadFloorReducers !== this.props.loadFloorReducers) {
      if (this.props.loadFloorReducers) {
        this.addDataSourceTable(this.props.loadFloorReducers);
      }
    }
    if (prevProps.loadOrderReducers !== this.props.loadOrderReducers) {
      if (this.props.loadOrderReducers) {
        userData.Order = Array.from(this.props.loadOrderReducers);
        await this.setState({
          ordered: Array.from(this.props.loadOrderReducers),
        });
        let arr = new Array();
        userData.Order.forEach((x) => {
          arr.push(x.Table);
        });
        this.setState({tableOrdered: arr});
        this.setState({isLoading: false});
      }
    }
    if (
      prevProps.loadTotalMoneyByTableReducers !==
      this.props.loadTotalMoneyByTableReducers
    ) {
      if (this.props.loadTotalMoneyByTableReducers) {
        userData.TotalMoneyByTable = Array.from(
          this.props.loadTotalMoneyByTableReducers,
        );
        userData.TotalMoneyByTable.includes((x) => {
          console.log(x);
        });
      }
    }
  }
  //Gán giá trị số bàn vào biến ds
  addDataSourceTable = (ds) => {
    var ds2 = new Array();
    let items = Array.apply(null, Array(ds[0].CountTable)).map((v, i) => {
      return {
        key: i + 1,
        money:
          userData.TotalMoneyByTable.find((x) => x.Table == i + 1) !== undefined
            ? userData.TotalMoneyByTable.find((x) => x.Table == i + 1)?.Total
            : 0,
      };
    });
    console.log(items);
    items.forEach((i) => {
      ds2.push(i);
    });
    this.setState({ds: Array.from(ds2)});
    userData.Table = Array.from(ds2);
  };
  _loadFloorApi = async () => {
    if (userData.Table.length == 0) {
      this.setState({isLoading: true});
      await this.props.onLoadFloorAction(userData.TOKEN);
    } else {
      this.setState({ds: userData.Table});
    }
  };
  _loadOrderApi = async () => {
    await this.props.onLoadOrderAction(userData.TOKEN);
  };
  render() {
    return (
      <ScrollView>
        <Headers navigation={this.props.navigation} title="Danh sách bàn" />
        <FlatList
          data={this.formatData(this.state.ds, numColumns)}
          renderItem={this.renderItem}
          numColumns={numColumns}
          extraData={this.state.selectedTable}
        />
        <View>
          <View></View>
          <View style={[{flexDirection: 'row'}]}>
            <Button type="primary" text="Chuyển bàn" />
            <Button type="danger" text="Hủy đơn hàng" />
            <Button type="info" text="Thanh toán" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: 'pink',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
