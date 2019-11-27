import React, { Component } from 'react';
import { Alert,PermissionsAndroid,Text, View, Image, ScrollView, TextInput, Button ,StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

export default class NavigatePage extends Component {
   async componentDidMount(){

    const value = await AsyncStorage.getItem('auth');
console.log("value", value)
    if(!value){ Actions.Login() }
  

   }
logOut(){



  AsyncStorage.removeItem('auth')
  Actions.Login()
}

    render(){
       
     return (
    
        <View style={{ flex: 1 }}>

      
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.borderContainer}>
                  <ScrollView>
                   
                   
                  
        
                    
                   
              <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:10}}>
              <Button
          title="Main Page"
          color="green"
          onPress={() => Actions.MainPage()}
        />
              <Button
          title="Add Product"
          color="green"
          onPress={() =>  Actions.ProductImageManagement({data:{pageName:'add',images:[],product:{}}})}
        />
           <Button
          title="Merchant Product"
          color="green"
          onPress={() => Actions.MerchantProductsPage()}
        />
        <Button
          title="Filter Price"
          color="green"
          onPress={() => Actions.filterPricePage()}
        />
          <Button
          title="Login Page"
          color="green"
          onPress={() => Actions.Login()}
        />
         <Button
          title="Register Page"
          color="green"
          onPress={() => Actions.RegisterPage()}
        />
       
          <Button
          title="Sell Report Page"
          color="green"
          onPress={() => Actions.SellReportPage()}
        />
           <Button
          title="Category Management Page"
          color="green"
          onPress={() => Actions.CategoryManagementPage()}
        />
          <Button
          title="Address Management Page"
          color="green"
          onPress={() => Actions.AddressManagementPage()}
        />
         <Button
          title="Profile Page"
          color="green"
          onPress={() => Actions.ProfilePage()}
        />
         <Button
          title="Edit Profile Page"
          color="green"
          onPress={() => Actions.EditProfilePage()}
        />

<Button
          title="Admin ProductList Page"
          color="green"
          onPress={() => Actions.AdminProductListPage()}
        />
        <Button
          title="ProfileList Page"
          color="green"
          onPress={() => Actions.ProfileListPage()}
        />
        <Button
          title="AdminSellReport Page"
          color="green"
          onPress={() => Actions.AdminSellReportPage()}
        />
          <Button
          title="Main Menu"
          color="green"
          onPress={() => Actions.MainMenuPage()}
        />
         <Button
          title="LogOut"
          color="green"
          onPress={() => this.logOut()}
        />
              </View></ScrollView>
                </View>

            </View>
           
        </View>
    )
}}
const styles = StyleSheet.create({
    borderContainer: {
        borderWidth:2,
        borderRadius:20,
        borderColor: "red",
        height: 500, 
        marginHorizontal: 40,
        marginTop:30
    },
TextInputStyles : {
    borderBottomWidth: 2, 
    borderColor: "red" 
}
});
