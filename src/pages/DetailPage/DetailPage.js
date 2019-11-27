import React, { Component } from 'react';
import { FlatList,Text, View, Image, ScrollView, TextInput, Button,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SliderBox } from 'react-native-image-slider-box';

export default class DetailPage extends Component {
    render(){
     console.log(this.props)
    return (
        <View style={{ flex: 1 }}>

        <View style={{flex:1}}>
            <View>
        
            <SliderBox images={this.props.item.imageURL} />
        <Text style={styles.text}>{this.props.item.name}</Text>

        </View>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            <View style={{borderRadius:20,borderWidth:1,borderColor:"red",padding:8,paddingHorizontal:20}}><Text style={{fontSize:13,fontWeight:"bold"}}>Size    : M</Text></View>
            <View style={{borderRadius:20,borderWidth:1,borderColor:"red",padding:8,paddingHorizontal:20}}><Text style={{fontSize:13,fontWeight:"bold"}}>weight : {this.props.item.shipping_details.weight } </Text></View>
        </View>
        <View style={{marginHorizontal:26,marginVertical:20}}>
            <Text style={{fontSize:17,fontWeight:"bold"}}>Details</Text>
            <Text style={{marginTop:5}}>{this.props.item.description} 
                </Text>
        </View>
        <View style={{marginHorizontal:26,marginVertical:20}}>
            <Text style={{fontSize:17,fontWeight:"bold"}}>Quantity </Text>
            <Text style={{marginTop:5}}>{this.props.item.quantityproduct} 
                </Text>
        </View>
        <View style={{marginHorizontal:26,marginVertical:20}}>
            <Text style={{fontSize:17,fontWeight:"bold"}}>Kategori</Text>
            <FlatList
        data={this.props.item.categories}
        renderItem={({ item,index }) =><Text style={{marginTop:5}}>{"- "+item} 
        </Text> }
        keyExtractor={item => item.id}
      />
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:27}}>
        <View style={{}}>
        <Text style={{color:"grey",fontSize:15,marginVertical:5}}>{this.props.item.name}
       
       </Text>
       <Text style={{color:"grey",fontSize:12,fontWeight:"bold"}}>PRICE
       
       </Text>
       
       <Text style={{color:"red",fontSize:16,fontWeight:"bold"}}>Rp.{this.props.item.price}</Text>
        </View>
     
        <View style={{ height:600,width:120,borderRadius:20,marginVertical:20}}>
        <Button
      title="Buy Now"
      color="red"
      onPress={() => {global.cartChanged = true;Actions.CartPageTestx(this.props)}}
    />
        </View>
        </View>
        </View>
        </View>

        
    )

}}
const styles = StyleSheet.create({
    container: {
       
        resizeMode:"cover",
        width:399,
        height:299
    },
    text :{
        marginHorizontal:30,
        fontSize:26,
        fontWeight:"bold",
        marginVertical:10,
        alignSelf:"center"
        
        
        
    }
  });

