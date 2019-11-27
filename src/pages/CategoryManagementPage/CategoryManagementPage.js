import React, { Component } from 'react';
import { View, Image, ScrollView, TextInput, Button ,StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';
 
var profileImage=null;   
export default class CategoryManagementPage extends Component {
   



    render(){
       
     return (
    
        <View style={{ flex: 1 }}>

      
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.borderContainer}>
                  <ScrollView>
                   
                   
                  
        
                    
                   
              <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:10}}>
              <Button
          title="Jenis"
          color="green"
          onPress={()=>Actions.AddProductCategory("jenis")}
        />
           <Button
          title="Bahan"
          color="green"
          onPress={()=>Actions.AddProductCategory("bahan")}
        />
        <Button
          title="Proses"
          color="green"
          onPress={()=>Actions.AddProductCategory("proses")}
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
