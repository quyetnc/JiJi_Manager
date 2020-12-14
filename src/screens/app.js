import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Login/login.screen';
import HomeScreen from './Home/home.screen';
import MenuScreen from './Menu/menu.screen';
// import ChatScreen from './Chat/chat.screen';
import ProfileScreen from './Profile/profile.screen';
import Profile from '../components/core/profile.core';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';

import {userData} from '../configs/setting';
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  async componentDidMount() {}
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={MyDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const renderItem = ({
    item = {
      id: 'list-table',
      title: 'Danh sách bàn',
      screen: 'Home',
      icon: require('../res/icons/ic_main.png'),
    },
  }) => (
    <DrawerItem
      style={{backgroundColor: '#8ce6ff'}}
      label={({focused, color}) => (
        <Text style={{color: '#fff', fontSize: 18}}>{item.title}</Text>
      )}
      icon={({focused, color, size}) => (
        <Image
          source={item.icon}
          style={{height: 50, width: 50, backgroundColor: '#8ce6ff'}}
        />
      )}
      onPress={() => {
        props.navigation.navigate(item.screen);
      }}></DrawerItem>
  );
  return (
    <DrawerContentScrollView {...props}>
      <Profile />
      <FlatList
        data={userData.Drawer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{drawerLabel: 'Home'}}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{drawerLabel: 'Menu'}}
        name="Menu"
        component={MenuScreen}
      />
      {/* <Drawer.Screen
        options={{drawerLabel: 'Chat'}}
        name="Chat"
        component={ChatScreen}
      /> */}

      <Drawer.Screen
        options={{drawerLabel: 'Profile'}}
        name="Profile"
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
}
