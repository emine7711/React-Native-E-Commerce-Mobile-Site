import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  BackAndroid,
  FlatList
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Product extends React.Component {

  static navigationOptions ={
    title: ' Ürünler',
    headerLeft: null,
    gestureEnabled: 'false'
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', () => {return true});
  }

  state={
    data:[]
  }

componentDidMount(){
  const url="https://www.jsonbulut.com/json/product.php?ref=5380f5dbcc3b1021f93ab24c3a1aac24&start=0"
  axios.get(url).then(res=>{
    const jd= res.data
this.setState({data:jd.Products[0].bilgiler})
//console.log("data" +JSON.stringify(jd.Products[0].bilgiler))
  })
}
  render(){
    return(
      <View style = {styles.container}>
        <ScrollView>
        <FlatList
        contentContainerStyle={{ flex:1, marginBottom:10, }}
        data={this.state.data}
        keyExtractor={item=> item.productId}
        renderItem={({item}) => (
          <TouchableOpacity onPress={ ()=> this.props.navigation.push("detail" , {item: item} )}> 
          <View style={ {
          flexDirection:'row',
          borderColor: '#191716',
          padding:8,
          marginBottom:5,
          borderWidth: 5,
          backgroundColor:'#44dbdf'}} >
        <Image source={{uri: item.images[0].thumb}} style={{width:75, height:75,}} />
        <View>
        <Text style={{fontWeight: 'bold', width:220, }} > { item.productName } </Text>
        <Text style={{width:220,}}> { item.brief} </Text>
        <Text style={{ fontWeight: 'bold',  marginLeft:180,marginTop:30,
    color: '#0e2993',}} > { item.price }₺ </Text>
        </View>
        </View>
        </TouchableOpacity>)}
        />
        </ScrollView>
       </View>
       
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})