import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';

import {Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {report} from 'react-native-elements';

export default class MerchantMenuPage extends Component {
  userId = global.userid;
  profile = {
    username: null,
    email: 'default@default.com',
    address: [],
    imageURL: 'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif',
    birthday: null,
    phone: null,
    gender: null,
  };
  state = {
    profile: this.profile,
    report: {quantity: 0, total: 0},
  };
  date = {end: new Date(), start: new Date()};

  static onEnterSomeView = () => {
    Actions.refresh({
      enterTime: new Date(),
    });
    console.log('onEnterSomeView');
  };
  componentDidMount() {
    this.getReport();
    this.getProfile();
  }

  async getReport() {
    //   ip = '192.168.1.7';
    let x = await fetch('http://' + ip + ':3001/getSellReport', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          merchant: global.userid,
          start: new Date(
            this.date.start.setMonth(this.date.start.getMonth() - 1),
          ),
          end: this.date.end,
        },
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
     

        var report = {
          quantity: responseJson.quantity,
          total: responseJson.total,
        };
       
        this.setState({report});
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  componentWillReceiveProps(nextProps) {
    // for you to see what is happening
    if (this.props.enterTime !== nextProps.enterTime) {

      if (global.userChanged < 2) {
        console.log('userChanged');
        this.userId = global.userid;
        this.getProfile();
        this.getReport();
        global.userChanged = global.userChanged + 1;
      } // a function that changes the state to re-render
    }

    // a function that changes the state to re-render
  }
  async getProfile() {
    console.log('getProductCat');

    //   ip = '192.168.1.7';
    let x = await fetch('http://' + ip + ':3001/getProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: this.userId}),
    })
      .then(response => response.json())
      .then(responseJson => {
        profile = responseJson;
        this.setState({profile});

      })
      .catch(error => {
        console.log(error.message);
      });
  }
  logOut() {
    AsyncStorage.removeItem('auth');
    Actions.reset('Login');
  }
  async logOutPrompt() {
    Alert.alert(
      'Logout',
      'Anda yakin untuk keluar dari aplikasi ?',
      [
        {
          text: 'Batal',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => this.logOut()},
      ],
      {cancelable: false},
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView>
            <Avatar
              size="large"
              rounded
              source={{
                uri: this.state.profile.imageURL,
              }}
              activeOpacity={0.7}
              containerStyle={{marginHorizontal: 30, marginVertical: 30}}
            />

            <Text
              style={{
                marginHorizontal: 120,
                marginVertical: -90,
                fontSize: 15,
              }}>
              Toko {this.state.profile.username}
            </Text>

            <View style={{marginHorizontal: 30, paddingTop: 140}}>
              <Text>
                {' '}
                <Icon active name="appstore" /> Akun Merchant
              </Text>
            </View>

            <Container>
              <Content>
                <ListItem>
                  <Left>
                    <Button style={{backgroundColor: '#FF9501'}}>
                      <Icon active name="cube" />
                    </Button>
                    <Text style={{left: 20}}>
                      {this.state.report.quantity} Produk Terjual
                    </Text>
                  </Left>

                  <Right>
                    <Icon active name="checkmark" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Button style={{backgroundColor: '#FF9501'}}>
                      <Icon active name="cash" />
                    </Button>
                    <Text style={{left: 20}}>
                      Nominal Penjualan Rp. {this.state.report.total}
                    </Text>
                  </Left>

                  <Right>
                    <Icon active name="checkmark" />
                  </Right>
                </ListItem>
                <ListItem onPress={() => Actions.MerchantOrderListPage()}>
                  <Left>
                    <Button style={{backgroundColor: '#007AFF'}}>
                      <Icon active name="person-add" />
                    </Button>
                    <Text style={{left: 20}}>Daftar Pesanan</Text>
                  </Left>

                  <Right>
                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem onPress={() => Actions.SellReportPage()}>
                  <Left>
                    <Button style={{backgroundColor: '#007AFF'}}>
                      <Icon active name="list" />
                    </Button>
                    <Text style={{left: 20}}>Laporan Penjualan</Text>
                  </Left>

                  <Right>
                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem onPress={() => Actions.MerchantProductsPage()}>
                  <Left>
                    <Button style={{backgroundColor: '#007AFF'}}>
                      <Icon active name="cog" />
                    </Button>
                    <Text style={{left: 20}}>Kelola Produk Anda</Text>
                  </Left>

                  <Right>
                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem
                  onPress={() => {
                    if (global.shipping.length == 0)
                      Alert.alert(
                        'Alamat anda belum terdaftar',
                        'Silahkan daftarkan alamat anda',
                        [
                          {
                            text: 'Ok',
                            onPress: () => Actions.AddressManagementPage(),
                          },
                        ],
                      );
                    else
                      Actions.ProductImageManagement({
                        data: {pageName: 'add', images: [], product: {}},
                      });
                  }}>
                  <Left>
                    <Button style={{backgroundColor: '#007AFF'}}>
                      <Icon active name="add" />
                    </Button>
                    <Text style={{left: 20}}>Tambah Produk</Text>
                  </Left>

                  <Right>
                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem onPress={() => this.logOutPrompt()}>
                  <Left>
                    <Button style={{backgroundColor: '#007AFF'}}>
                      <Icon active name="log-out" />
                    </Button>
                    <Text style={{left: 20}}>Keluar</Text>
                  </Left>

                  <Right>
                    <Icon active name="log-out" />
                  </Right>
                </ListItem>
              </Content>
            </Container>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: 'red',
    height: 499,
    marginHorizontal: 30,
    marginTop: 30,
    marginVertical: 30,
  },
});
