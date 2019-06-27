import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
//package.json a kütüphane ekledik.

export default class Login extends React.Component {
  state = {
    mail: 'ali@ali.com',
    pass: '12345',
  };
  fncAlert = (title, desc) => {
    Alert.alert(title, desc, [
      {
        text: 'Tamam',
        onPress: () => {
          /* tamam butonu yapılacak iş */
        },
      },
    ]);
  };

  fncLogin = () => {
    const m = this.state.mail;
    const s = this.state.pass;
    //https://www.jsonbulut.com/admin/index.php?link=json&id=kullanici_giris safasından aldık yönlndirmeyi
    const url = 'https://www.jsonbulut.com/json/userLogin.php';
    const dt = {
      ref: '5380f5dbcc3b1021f93ab24c3a1aac24',
      userEmail: m,
      userPass: s,
      face: 'no',
    };
    axios.get(url, { params: dt }).then(res => {
      //İşlemin sonucu glene kadar bekleme işlemii then yapar. async.await e karşılıktır.
      const dt = res.data;
      // console.log("data :" +JSON.stringify(dt))
      const mesaj = dt.user[0].mesaj;
      const durum = dt.user[0].durum;
      if (durum) {
        this.props.navigation.push('product');
      } else {
        this.fncAlert('Hata', mesaj);
      }
    });
    //{params: dt} ı veri gönderilirken kullanılır.
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Kullanıcı Girişi</Text>
          <TextInput
            value={this.state.mail}
            autoCapitalize="none"
            onChangeText={txt => this.setState({ mail: txt })}
            style={styles.txt}
            keyboardType="email-address"
            placeholder="Mail Adresi"
          />
          <TextInput
            value={this.state.pass}
            secureTextEntry
            onChangeText={txt => this.setState({ pass: txt })}
            style={styles.txt}
            placeholder="Şifreniz"
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.fncLogin()}>
              <Text style={styles.btn}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('register');
              }}>
              <Text style={styles.btn}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
//}} çift süslü parantez attributelere style yazmak istediğğimizde koyarız.
//autoCapitalize="none" ile  küçük harfle başlamasını zorunlu kıldık.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0e2993',
    marginBottom: 10,
  },
  txt: {
    borderColor: '#53bc78',
    borderWidth: 2,
    fontSize: 18,
    padding: 10,
    borderRadius: 8, //borderRadius: '20%' gibi de kullanılabilir ama tavrise edilmez responsibility açısından
    marginBottom: 10,
  },
  btn: {
    width: 100,
    borderColor: 'Blak',
    borderWidth: 2,
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
});
