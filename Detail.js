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
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';

const h = Dimensions.get('window').height;

export default class Detail extends React.Component {
  state = {
    imgStatus: false,
  };
  jd = this.props.navigation.getParam('item', null);

//bütün fotoğraflar gelsin diye bir metot içinde diziye attık.
  imgList = () => {
    var list = []
this.jd.images.forEach(item=>{
list.push({url:item.normal})
})
    return list
  }


  static navigationOptions = {
    title: ' Detaylar',
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.imgStatus} transparent={true}>
          <ImageViewer
            enableSwipeDown={true}
            onSwipeDown={() => this.setState({ imgStatus: false })}
            imageUrls={this.imgList()}
          />
        </Modal>

        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ imgStatus: true })}>
            <View
              style={{
                borderColor: '#4259ff',
                borderWidth: 3,
                padding: 5,
                marginBottom: 10,
                backgroundColor: '#44dbdf',
              }}>
              <Image
                source={{ uri: this.jd.images[0].normal,cache:'default' }}
                style={{ flex: 1, height: h * 0.3 }}
                resizeMode="center"
              />
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              borderColor: '#4259ff',
              borderWidth: 1,
              padding: 5,
              backgroundColor: '#44dbdf',
            }}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
              {' '}
              {this.jd.productName}
            </Text>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>
              {' '}
              {this.jd.brief}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 200,
                marginTop: 10,
                fontSize: 25,
                color: '#0e2993',
              }}>
              {' '}
              {this.jd.price}₺
            </Text>
          </View>
          <View
            style={{
              borderColor: '#4259ff',
              borderWidth: 1,
              padding: 5,
              backgroundColor: '#44dbdf',
            }}>
            <Text style={{ fontSize: 15, textAlign: 'center' }}>
              {' '}
              {this.jd.description}
            </Text>
          </View>
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
});
