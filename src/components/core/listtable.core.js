import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { userData } from '../../configs/setting';
// import store from '../../src/store';

const numColumns = 4;
export default class ListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: 1,
      tableOrdered:new Array(), //Danh sách những bàn đã order
    };
  }
 componentDidMount(){
   let arr=new Array();
   userData.Order.forEach(x=>{arr.push(x.Table)});
   this.setState({ tableOrdered:arr});
   console.log("componentDidMount",userData.Order);
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
  onClick = async (numTable=0) => {
    await this.setState({selectedTable: numTable});
    console.log('vcl hihi', this.state.selectedTable);
  };
  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={[
          styles.item,
          this.state.selectedTable ===parseInt(item.key)
            ? {backgroundColor: '#ebff9d'}
            :(this.state.tableOrdered.includes(item.key)?{backgroundColor: 'red'}: {backgroundColor: '#42b72a'}),
          ,
        ]}
        onPress={() =>{
          this.setState({selectedTable: parseInt(item.key)});
        }}
        onLongPress={()=>{
          console.log("Double Clicked!");
        }}>
        <Image
          source={require('../../res/images/milktea.png')}
          style={{alignContent: 'center', width: 50, height: 50, marginTop: 5}}
        />
        <View>
          <Text>{item.key}</Text>
        </View>
        <Text
          style={{fontSize: 10, textAlign: 'right', alignContent: 'stretch'}}>
          20.000đ
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    console.log("Rendered");
    return (
      <View
      style={[styles.container,this.props.style]}>
        <FlatList
          data={this.formatData(this.props.ds, numColumns)}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height:'auto',
    backgroundColor:'pink'
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
