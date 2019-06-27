import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import Product from './Product';
import Detail from './Detail';

const stack = createStackNavigator(
  {
    login: { screen: Login },
    register: { screen: Register },
    product: { screen: Product},
    detail: { screen: Detail}
  },
  {
    initialRouteName: 'login',
  }
);
//login ve register burada key alanlardır.
export default createAppContainer(stack);
//Yeni oluşturulan dinamo döner geriye. ilk olarak hanisini tanımladısak o açılır. burada login açılır.
//Defaultta açılacak kısmı   initialRouteName:'login',  ile belitiriz.
