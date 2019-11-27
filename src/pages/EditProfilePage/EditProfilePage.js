import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button,TouchableOpacity , TouchableHighlight,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import ImageResizer from 'react-native-image-resizer';
const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
export default class EditProfilePage extends Component {
    userId=this.props.data?this.props.data.profileId:global.userid;
    profile={
        id:this.userId,
        username:null,
        email:'default@default.com',
        address:[],
        imageURL:'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif',
        birthday:null,
        phone:null,
        gender:null
    };
    state={
        profile:this.profile,
        isStartDateTimePickerVisible:false,
        value:null
    }
    status=this.profile.status;
    genderOptions=[{label:'Laki - Laki',value:'pria'},{label:'Wanita',value:'wanita'}];
    componentDidMount() {

        this.getProfile();
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
        var profile=responseJson;
        this.profile = responseJson;
        this.status=this.profile.status;
        
        this.setState({ profile});
      
       
       
         
      })
      .catch((error) => {
          console.log(error.message);
      });

    }

    showStartDateTimePicker() {
        console.log("showStartDateTimePicker")
        this.setState({ isStartDateTimePickerVisible: true });
     
      };
     
      hideStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: false });
      };
     
      handleStartDatePicked = date => {
        //console.log("A Start date has been picked: ", date);
        this.state.profile.birthday=date;
        this.profile.birthday= date;
    //   /  this.setState( date.start: date });
        this.hideStartDateTimePicker();
      };

async updateProfile(){
  
  var isStatusChanged=(this.status!=this.profile.status);

    await fetch('http://' + ip + ':3001/updateProfile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({profile:this.profile,isStatusChanged:isStatusChanged})
          }) ;
          global.userChanged=0;
      

}
     async onSubmit(){
      
   await this.updateProfile();
    Actions.NavigatePage();
    }
    
    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('You cancelled image picker 😟');
          } else if (response.error) {
            alert('And error occured: ', response.error);
          } else {
           this.uploadImage(response.uri)
          }
        });
      };
      uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
      async uploadImage(photoUri) {
        var outPut = "/storage/emulated/0/";
  
        //console.log(  outPut+this.state.fileName.toString());
         await   ImageResizer.createResizedImage(photoUri, 640, 480, 'JPEG', 80).then((res) => {
              outPut=outPut+photoUri.toString();
              console.log("rezie terpanggil")
              fileName= '/'+this.uuidv4()+'.jpeg';
                // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
                
          
               firebase
                  .storage()
                .ref(fileName)
               .putFile(
                res.path
                ).on( firebase.storage.TaskEvent.STATE_CHANGED, snapshot=>{
              
                if (snapshot.state ===  firebase.storage.TaskState.SUCCESS) {
                  
                 
              

   let profile= this.state.profile;
   profile.imageURL= snapshot.downloadURL;
   this.profile.imageURL= snapshot.downloadURL;
   this.setState({profile})
                  
                
               
               
                }
    
                })
              } )
            }
    render(){
    
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: "white", }}>
            <ScrollView>
            <TouchableOpacity onPress={()=>this.pickImage()}>
<Avatar
  size="large"
  rounded
  source={{
    uri:
     this.state.profile.imageURL,
  }}
  showEditButton
  activeOpacity={0.7}
  containerStyle={{marginHorizontal:30,marginVertical:30}}
/></TouchableOpacity>

    <Text style={{marginHorizontal:120,marginVertical:-90,fontSize:15}}>{this.state.profile.username}</Text>


    <View style={{ marginHorizontal: 30,paddingTop:140}}>
                        <Text>Nama Lengkap</Text>
                        <TextInput
                        onChangeText={(value) =>{this.profile.username=value}}
                        defaultValue={this.state.profile.username} 
                        style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Tanggal Lahir</Text>
                        <>
        <Button style={{height:50}} title={!this.state.profile.birthday ?'Silahkan Masukan Tanggal Lahir Anda':new Date(this.state.profile.birthday) .toLocaleDateString()} onPress={()=>this.showStartDateTimePicker()} />
        <DateTimePicker
        date={this.state.profile.birthday?new Date(this.state.profile.birthday):new Date(1996, 4, 28)}
          isVisible={this.state.isStartDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
      </>
                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Jenis kelamin</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) => {let profile = this.state.profile ; profile.gender=value ;this.setState({profile}); this.profile.gender=value}}
      items={this.genderOptions}
      value={this.state.profile.gender}
  />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>Email (belum bisa diubah)</Text>
                        <TextInput editable={false}
                        defaultValue={this.profile.email} 
                        placeholder={this.state.profile.email} style={ styles.TextInputStyles} />

                    </View>
                    <View style={{ marginHorizontal: 30,paddingTop:15}}>
                        <Text>No Hp</Text>
                        <TextInput
                        onChangeText={(value) =>{this.profile.phone=value}}
                        defaultValue={this.profile.phone} 
                        keyboardType='numeric' 
                        placeholder={this.state.profile.phone?this.state.profile.phone:'Silahkan Masukan No Telpon Anda '} style={ styles.TextInputStyles} />

                    </View>

                    <View style={{ marginLeft:8,marginVertical:10}}>
                        <Text>Status</Text>
                        <RNPickerSelect style={{ width: 5 }}
      onValueChange={(value) => {let profile = this.state.profile ; profile.status=value ;this.setState({profile}); this.profile.status=value}}
      items={[{label:'Active',value:'active'},{label:'Suspend',value:'suspended'}]}
      value={this.state.profile.status}
  />
                    </View>
                    <View style={{ marginHorizontal: 35,borderRadius:20,marginVertical:0}}>
              <Button
          title="Simpan"
          color="red"
          onPress={() => this.onSubmit()}
        />
          
              </View>
               
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#794F9B',
    },

}); 



