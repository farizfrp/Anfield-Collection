import React, { Component } from 'react';
import { AsyncStorage,Alert, View, Image, ScrollView, TextInput,TouchableOpacity , TouchableHighlight,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


export default class AdminMenuPage extends Component {
    userId=global.userid;
    profile={
        username:null,
        email:'default@default.com',
        address:[],
        imageURL:'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif',
        birthday:null,
        phone:null,
        gender:null
    };
    state={
        profile:this.profile
    }
    static onEnterSomeView = () => {
        Actions.refresh({
          enterTime: new Date(),
        });
        console.log('onEnterSomeView')
      }
    componentDidMount() {

        this.getProfile();
                }
 componentWillReceiveProps(nextProps) {
                    // for you to see what is happening
                    if (this.props.enterTime !== nextProps.enterTime) {
                        console.log("componentWillReceiveProps");
                        if(global.userChanged<2){ 
                            console.log("userChanged");
                            this.userId= global.userid;
                            this.getProfile();
                         global.userChanged=false;
                         global.userChanged=global.userChanged+1;
                         
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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId : this.userId})
      }).then((response) => response.json())
      .then((responseJson) => {
        profile=responseJson;
        this.setState({ profile});
      
        
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }
    logOut(){



        AsyncStorage.removeItem('auth')
       
        Actions.reset('Login')
      }
      async logOutPrompt() {

        Alert.alert(
          'Logout',
          'Anda yakin untuk keluar dari aplikasi ?',
          [
    
            {
              text: 'Batal',
              onPress: () => { return; },
              style: 'cancel',
            },
            { text: 'Ya', onPress: () => this.logOut() },
          ],
          { cancelable: false },
        );
    
    
      }
    render(){
        return (
            <View style={{ flex: 1 }}>
    
                <View style={{ flex: 1, backgroundColor: "white", }}>
                <ScrollView>
                
    <Avatar
      size="large"
      rounded
      source={{
        uri:
         this.state.profile.imageURL,
      }}
     
      activeOpacity={0.7}
      containerStyle={{marginHorizontal:30,marginVertical:30}}
    />
    
        <Text style={{marginHorizontal:120,marginVertical:-90,fontSize:15}}>{this.state.profile.username}</Text>
    
    
        <View style={{ marginHorizontal: 30,paddingTop:140}}>
                            <Text><Icon active name="hammer" /> ADMIN</Text>
                           
    
                        </View>
                     
                        <Container>
     
        <Content>
          <ListItem onPress={()=>Actions.AdminProductListPage()} >
            <Left>
              <Button style={{  backgroundColor: "#FF9501" }}>
                <Icon active name="pricetag" />
              </Button>
              <Text  style={{ left:20}}>Product Management</Text>
            </Left>
            
            
          
            <Right>
            <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>Actions.ProfileListPage()}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="person" />
               
              </Button>
              <Text style={{ left:20}}>User List</Text>
            </Left>
           
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>Actions.CategoryManagementPage()}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="apps" />
             
              </Button>
              <Text style={{ left:20}}>Category Management</Text>
            </Left>
            
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>Actions.AdminSellReportPage()}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="list" />
             
              </Button>
              <Text style={{ left:20}}>Sell Report</Text>
            </Left>
            
            <Right>
            
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.logOutPrompt()}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="log-out" />
             
              </Button>
              <Text style={{ left:20}}>Keluar</Text>
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
         )
   }}
   const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:16,
        borderColor: "red",
        height: 499, 
        marginHorizontal:30,
        marginTop:30,
        marginVertical:30
    },

}); 



