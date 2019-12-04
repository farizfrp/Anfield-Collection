import React, { Component } from 'react';
import { Alert,PermissionsAndroid,Text, View, Image, ScrollView, TextInput, Button ,StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { SliderBox } from 'react-native-image-slider-box';
var profileImage=null;   
export default class RegisterPage extends Component {
    options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    province;
    state = {
        email: '',
        username:'default',
            password: '',
            isLoggingIn: false,
            message: '',
            photo: [],
            path:"/storage/emulated/0/DCIM/Camera/IMG_20191005_101026.jpg",
            province:[],
            city:[]
        }

        account ={
          id:null,
          email:null,
          imageURL:null,
          shipping:[],
          isMerchant:false,
          phone:null,
          birthday:null,
          gender:null
          }
          shipping=[];
          
        componentDidMount() {

this.setState({photo:['https://firebasestorage.googleapis.com/v0/b/fir-reactnative-e4275.appspot.com/o/307abadc-5be0-4498-a63b-394d5f1deafd.jpeg?alt=media&token=14ae24b3-3024-472d-84a6-22de9659047e']})
          this.getProvince();
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

async createAccount(){
  this.account.email=this.state.email;

  var email;
  var id;
  var username;
  await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((result) => {
      email=this.state.email;
      username=this.state.username;
id=result.user.uid;
console.log("UIDUID = ",id)
      console.log(result);
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        
          }, function(error) {
          // An error happened.
          });
  }).catch(function(error) {
  console.log(error);
  });
  this.account.username=username;
  this.account.email=email;
  this.account.id=id;
  this.onRegister();


}

    async onRegister(){
        this.account.imageURL='https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif';
        this.account.shipping=[]
        let x = await fetch(ip + '/addAccount', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(this.account)
        });
       Alert.alert("Berhasil!!!");
       console.log("onSubmit",this.account)

    }
    async getProvince() {

      console.log("getProvince");

      await fetch('https://api.rajaongkir.com/starter/province', {
        method: 'GET',
        headers: {

          'key': '7567d6480344c47b7e978c6a825077ce'
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        
data=responseJson.rajaongkir.results;
        const prov = data.map(function(row) {

          // This function defines the "mapping behaviour". name and title 
          // data from each "row" from your columns array is mapped to a 
          // corresponding item in the new "options" array
       
          return { label : row.province, value : row.province_id }
       })
this.setState({province:prov})
      })
      .catch((error) => {
          console.log(error.message);
      });
      console.log("Province = = = = = ");
      console.log(this.state.province);
  }
  setCity(index){
index--;
this.shipping.city={id:this.state.city[index].value,
  name:this.state.city[index].label

}



  }


  setProvince(index){
    index--;
    this.shipping.province={id:this.state.province[index].value,
      name:this.state.province[index].label
    
    }
    
    
    
      }

  async getCity(id,index) {

    console.log("getProvince");

    await fetch('https://api.rajaongkir.com/starter/city?province='+id, {
      method: 'GET',
      headers: {

        'key': '7567d6480344c47b7e978c6a825077ce'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      
data=responseJson.rajaongkir.results;
      const city = data.map(function(row) {

        // This function defines the "mapping behaviour". name and title 
        // data from each "row" from your columns array is mapped to a 
        // corresponding item in the new "options" array
     
        return { label : row.type+" "+row.city_name, value : row.city_id }
     })
this.setState({city:city})
this.setProvince(index);
    })
    .catch((error) => {
        console.log(error.message);
    });
    console.log("City = = = = = ");
    console.log(this.state.city);
}
choosePicture() {
        const granted = this.requestCameraPermission();
        ImagePicker.showImagePicker(this.options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    console.log(response);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
            photo: source,
            fileName: response.fileName
        });
        this.uploadImage()
        console.log("source = "+ source);
      }
    });
   
  }
//<Image source={this.state.avatarSource}  />
uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


uploadImage() {
  var outPut = "/storage/emulated/0/";
  var onSuccess;
  var imageURL;

  //console.log(  outPut+this.state.fileName.toString());
    var downloadURL= ImageResizer.createResizedImage(this.state.photo.uri, 640, 480, 'JPEG', 80).then((res) => {
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
       console.log(snapshot.bytesTransferred);
            
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
              
              profileImage=downloadURL;
              
              Alert.alert(
                'Berhasil !!!',
                'Gambar Berhasil Di Upload',
                [
                  
                  
                  {text: 'Ya', onPress: () => {return ; }},
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



    render(){
        const { photo } = this.state;
     return (
    
        <View style={{ flex: 1 }}>
    
      
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.borderContainer}>
                  <ScrollView>
                    <View style={{ marginHorizontal:30,marginVertical:30 }}>
                   
                  
        
                        <Text style={{ fontSize: 25 }}>Sign Up              </Text>
                        <Text style={{color:"grey"}}>sign in to continue</Text>
                        <View style={{marginVertical:10}}></View>

                    </View>
                    </ScrollView>
                
                    <View style={{ marginHorizontal: 30}}>
                        <Text>Email</Text>
                        <TextInput onChangeText={(email) => this.setState({email})}placeholder="haha@example.com" style={ styles.TextInputStyles} />
                    </View>
                    <View style={{ marginHorizontal: 30,marginVertical:15}}>
                        <Text>Full Name</Text>
                        <TextInput onChangeText={(name) => this.setState({name})} placeholder="NAMA " style={ styles.TextInputStyles} />
                    </View>
                   
                    <View style={{ marginHorizontal: 30,marginVertical:15}}>
                        <Text>Password</Text>
                        <TextInput onChangeText={(password) => this.setState({password})}placeholder="********" style={ styles.TextInputStyles } />
                    </View>
                    
                   
              <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:10}}>
              <Button
          title="Sign Up"
          color="red"
          onPress={() => this.createAccount()}
        />
           
       
              </View>
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
