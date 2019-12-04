import React, { Component } from 'react';
import {Alert, Text, View, Image, ScrollView, TextInput, Button ,StyleSheet,ActivityIndicator,StatusBar} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import { SliderBox } from 'react-native-image-slider-box';
//import { auth } from 'firebase-admin';


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
  
}
var data = {
           
    name:null,
    id: null,
    description:"Default Description",
    merchant:"default",
    manufacture_details:{sku:"xxx",release_date:new Date().getTime()},
    categories:["undefined","undefined","undefined"],
    shipping_details:{weight:0,width:0,height:0,depth:0},
    quantityproduct:1,
    price:0,
    imageURL:["https://screenshotlayer.com/images/assets/placeholder.png"]
    }
    
export default class EditProductPage extends Component {
  
    state = {
      isLoading: true,
        email: '',
            password: '',
            isLoggingIn: false,
            message: '',
            photo: null,
            path:"/storage/emulated/0/DCIM/Camera/IMG_20191005_101026.jpg",
            imageURL:"bukan",
            jenis:  [],
            proses:[],
            bahan:[],
            jenisVal:  null,
            prosesVal:null,
            bahanVal:null,
            productstatus:'active'
        } 
       
        options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
         
product=this.props.data.product;
images=this.props.data.images;

          async componentDidMount() { 
            
            data  = this.product;
            data.imageURL = this.images;
            let state = this.state;
            state.bahanVal = this.product.categories[1];
            state.prosesVal = this.product.categories[2];
            state.jenisVal = this.product.categories[0];
            state.productstatus = this.product.productstatus;
            this.setState({state})
          
          console.log(this.product.quantityproduct)
          this.getCategories();
          
          }
      


async groupJenis(categories){
var result=[];
var index=0
for (var val of categories){

  result[index]={label:val.name, value: val.name}
  index++;
}
console.log("res",result)
this.state.jenis=result;
}
async groupBahan(categories){
  var result=[];
  var index=0
  for (var val of categories){
  
    result[index]={label:val.name, value: val.name}
    index++;
  }
  console.log("res",result)
  this.state.bahan=result;
  }
  async groupProses(categories){
    var result=[];
    var index=0
    for (var val of categories){
    
      result[index]={label:val.name, value: val.name}
      index++;
    }
    console.log("res",result)
    this.state.proses=result;
    this.setState({proses:result})
    }
          async getCategories() {

       
            //   ip = '192.168.1.7';
             await fetch(ip + '/getCategories', {
               method: 'GET',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               }
             }).then((response) => response.json())
             .then((responseJson) => {
            categories=responseJson;
              this.groupJenis(categories[0].value);
              this.groupBahan(categories[1].value);
              this.groupProses(categories[2].value);
              console.log("state",this.state.proses);
             })
             .catch((error) => {
                 console.log(error.message);
             });
            
           }
      
    choosePicture() {
        const granted = this.requestCameraPermission();
        ImagePicker.showImagePicker(this.options, (response) => {
 
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
            photo: source,
            fileName: response.fileName
        });
        this.uploadImage()
       
      }
    });
   
  }
//<Image source={this.state.avatarSource}  />
uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

requestCameraPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
   return} catch (err) {
      console.warn(err);
    }
  }
uploadImage() {
var outPut = "/storage/emulated/0/";
var onSuccess;

//console.log(  outPut+this.state.fileName.toString());
    ImageResizer.createResizedImage(this.state.photo.uri, 640, 480, 'JPEG', 80).then((res) => {
      outPut=outPut+this.state.fileName.toString();
     
      fileName= '/'+this.uuidv4()+'.jpeg';
        // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
        var uploadTask =    firebase
          .storage()
        .ref(fileName)
       .putFile(
        res.path
        );

      uploadTask.on('state_changed', function(snapshot){
       onSuccess=snapshot;
  
          
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebase.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          //     case firebase.storage.TaskState.SUCCESS: 
              
          //      // or 'running'
          //     console.log('Upload is SUCCESS');
          //     break;
          // }
        }, function(error) {
          console.log('ERROR = '+ error);
          console.log('ERROR = '+ error.message);
        
          // Handle unsuccessful uploads
        }, function() {
          console.log('Upload Success beneran');
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //   console.log('File available at', downloadURL);
          // });
         
          onSuccess.ref.getDownloadURL().then(function(downloadURL) {
            data.imageURL[0]=downloadURL;
          
            Alert.alert(
              'Berhasil !!!',
              'Gambar Berhasil Di Upload',
              [
                
                
                {text: 'Ya', onPress: () => {return }},
              ],
              {cancelable: false},
            );
          });
        });




     //   console.log("down = = = = = = ="+z.getDownloadURL());
      }).catch((err) => {
        console.log(err);
      });


  
      }
 
      async onSubmit() {
        console.log(this.state.imageURL);

         
        data.merchant=global.userid;
        data.imageURL=this.images;
        
       // ip='192.168.1.7';
    await fetch(ip + '/updateProduct', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({product:data})
      }) ;
      console.log('Pushed');
      if(global.userRole=='user')Actions.MerchantProductsPage();
      else Actions.AdminProductListPage();
     
      console.log('Pushed');
  

    }


    render(){

        
    return (
        <View style={{ flex: 1 }}>
 <ScrollView
         style={{
      flex: 1,
     
  }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                
               
              
        <SliderBox images={this.images} />

        <Button
        title="Edit Picture"
        color="blue"
        onPress={() => Actions.ProductImageManagement({data:{pageName:'edit',images:this.images,product:this.product}})}
      />

                    <View style={{ marginLeft:8,marginVertical:30 }}>
                        <Text style={{ fontSize: 25 }}>Edit Produk             </Text>
                        <Text style={{color:"grey"}}>Edit produk </Text>
                        <View style={{marginVertical:10}}></View>

                    </View>

                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Jenis</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) => {data.categories[0]=value; this.setState({jenisVal:value})}}
      items={this.state.jenis}
      value={this.state.jenisVal}
  />
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Bahan Utama</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) =>  {data.categories[1]=value  ; this.setState({bahanVal:value})}}
      items={this.state.bahan}
      value={this.state.bahanVal}
  />
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Proses</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) => { data.categories[2]=value  ;this.setState({prosesVal:value})}}
      items={this.state.proses}
      value={this.state.prosesVal}
  />
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Nama Produk</Text>
                        <TextInput placeholder="Nama " style={ styles.TextInputStyles} 
                           defaultValue={this.product.name} onChangeText={(nama) => data.name=nama}/>
                    </View>
                    
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Deskripsi Produk</Text>
                        <TextInput placeholder="Deskripsi " style={ styles.TextInputStyles} 
                           defaultValue={this.product.description} onChangeText={(description) => data.description=description}/>
                    </View>
                 
                   
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Quantity</Text>
                        <TextInput keyboardType='numeric' placeholder="10" style={ styles.TextInputStyles } 
                      defaultValue={this.product.quantityproduct.toString()}  onChangeText={(quantity) =>data.quantityproduct=Number(quantity)}/>
                    </View>
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Berat</Text>
                        <TextInput keyboardType='numeric' placeholder="50 Gram" style={ styles.TextInputStyles}
                        defaultValue={this.product.shipping_details.weight.toString()} onChangeText={(berat) => data.shipping_details.weight=Number(berat)} />
                    </View>
                    
                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Harga</Text>
                        <TextInput keyboardType='numeric' placeholder="Rp.150.000,00" style={ styles.TextInputStyles} 
                       defaultValue={this.product.price.toString()}  onChangeText={(harga) => data.price=Number(harga)}/>
                    </View>

                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Status</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) => { data.productstatus=value  ;this.setState({productstatus:value})}}
      items={[{label:'Active',value:'active'},{label:'Deactive',value:'deactive'}]}
      value={this.state.productstatus}
  />
                    </View>
                   
              <View style={{ marginHorizontal: 8,borderRadius:20,marginVertical:10}}>
              <Button
          title="Tambahkan"
          color="red"
          onPress={() => this.onSubmit()}
        />
   
              </View>
                </View>
               
          
            </ScrollView>
        </View>
    )
}}
const styles = StyleSheet.create({
    borderContainer: {
      
        borderRadius:16,
      
        height: 669, 
        marginHorizontal:30,
        marginTop:30,
        marginVertical:30
    },
TextInputStyles : {
    borderBottomWidth: 2, 
    borderColor: "red" 
}
});
