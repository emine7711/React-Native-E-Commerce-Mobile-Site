import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//package.json a kütüphane ekledik.

export default class Register extends React.Component {
  state = {
    mail: '',
    pass: '',
    name: '',
    surname: '',
    phone: '',
  };

  fncRegister = () => {
    const m = this.state.mail;
    const s = this.state.pass;
    const uName = this.state.name;
    const uSurname = this.state.surname;
    const uPhone = this.state.phone;
    //https://www.jsonbulut.com/admin/index.php?link=json&id=kullanici_giris safasından aldık yönlndirmeyi
    const url = 'https://www.jsonbulut.com/json/userRegister.php';
    const dt = {
      ref: '5380f5dbcc3b1021f93ab24c3a1aac24',
      userName: uName,
      userSurname: uSurname,
      userPhone: uPhone,
      userMail: m,
      userPass: s,
    };
    axios.get(url, { params: dt }).then(res => {
      //İşlemin sonucu glene kadar bekleme işlemii then yapar. async.await e karşılıktır.
      const dt = res.data;
      console.log("data :" +JSON.stringify(dt));
     // const mesaj = dt.user[0].mesaj;
      const durum = dt.user[0].durum;
      if(durum){
        this.props.navagiation.goBack();
      }
    });
    //this.props.navagiation.goBack(); Geri dön olayı
    //{params: dt} ı veri gönderilirken kullanılır.
  };
  render() {
    return (
      <View style={styles.container}>        
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true} extraHeight={10}>          
          <Text style={styles.title}>Kullanıcı Kayıt</Text>
          <TextInput
            onChangeText={txt => this.setState({ mail: txt })}
            style={styles.txt}
            keyboardType="email-address"
            placeholder="Mail Adresi"
          />
          <TextInput
            secureTextEntry
            onChangeText={txt => this.setState({ pass: txt })}
            style={styles.txt}
            placeholder="Şifreniz"
          />
          <TextInput
            onChangeText={txt => this.setState({ name: txt })}
            style={styles.txt}
            placeholder="Adınız"
          />
          <TextInput
            onChangeText={txt => this.setState({ surname: txt })}
            style={styles.txt}
            placeholder="Soyadınız"
          />
          <TextInput
            onChangeText={txt => this.setState({ phone: txt })}
            style={styles.txt}
            placeholder="Telefon Numaranız"
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.fncRegister()}>
              <Text style={styles.btn}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
//}} çift süslü parantez attributelere style yazmak istediğğimizde koyarız.

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
    marginBottom: 30,
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

// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Constants } from 'expo';

// export default class Register extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
// });
