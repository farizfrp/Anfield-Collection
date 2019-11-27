import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  ScrollView
 
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import ImageResizer from 'react-native-image-resizer';
import { Actions } from 'react-native-router-flux';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const ImageRow = ({ image, windowWidth, popImage }) => (
  <View>
    
    <Image
      source={{ uri: image }}
      style={[styles.img, { width: windowWidth / 2 - 15 }]}
      onError={popImage}
    />
  </View>
);

export default class ProductImageManagement extends Component {
  state = {
    imgSource: '',
    uploading: false,
    progress: 0,
    images: []
  
  };
  imagesUrl=this.props.data.images;
  product=this.props.data.product;
  uploadImages=[];
  pageName= this.props.data.pageName;
  componentDidMount() {
    var localImage = this.imagesUrl;
    for(var img of localImage){
      const allImages = this.state.images;
            allImages.push(img);
      state = {
       state,
        uploading: false,
        imgSource: '',
        imageUri: '',
        progress: 0,
        images: allImages
      };
      
    this.setState(state);
    }
    
    let images;
    AsyncStorage.getItem('images')
      .then(data => {
        images = JSON.parse(data) || [];
      
      })
      .catch(error => {
        console.log(error);
      });
  }
  /**
   * Select image method
   */
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        const allImages = this.state.images;
        allImages.push(response.uri);
        this.uploadImages.push(response.uri);
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uuidv4() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
   totalUploaded=0;
   multiFirebase=[];
   isUploaded=[];
  async uploadImage(photoUri,index) {
    var outPut = "/storage/emulated/0/";
    this.multiFirebase[index]=firebase;
   
    //console.log(  outPut+this.state.fileName.toString());
     await   ImageResizer.createResizedImage(photoUri, 640, 480, 'JPEG', 80).then((res) => {
      //alert('Masuk Resize');
          outPut=outPut+photoUri.toString();
          console.log("rezie terpanggil")
          fileName= '/'+this.uuidv4()+'.jpeg';
  
            // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
            
            this.isUploaded[index]=false;
            this.multiFirebase[index]
              .storage()
            .ref(fileName)
           .putFile(
            res.path
            ).on( this.multiFirebase[index].storage.TaskEvent.STATE_CHANGED, snapshot=>{
              
            if (snapshot.state ===  this.multiFirebase[index].storage.TaskState.SUCCESS && this.isUploaded[index]==false) {
              
              this.imagesUrl[index]=snapshot.downloadURL;
              this.isUploaded[index]=true;
this.totalUploaded=this.totalUploaded+1;

if(this.totalUploaded==this.uploadImages.length){
  console.log("Terupload Semua")

 this.navigatePage();
  return;
  
}
              
            
           
           
            }

            })
          } )
        }
        
    
    
      
          




  
  /**
   * Remove image from the state and persistance storage
   */
  removeImage = imageIndex => {
    let images = this.state.images;
    images.splice(imageIndex,1);
    this.imagesUrl.splice(imageIndex,1);
    this.setState({ images });
    AsyncStorage.setItem('images', JSON.stringify(images));
  };
  
  async promptPull(index) {
console.log("index",index)
    Alert.alert(
      'Hapus Foto',
      'Anda yakin akan menghapus foto ini ?',
      [

        {
          text: 'Batal',
          onPress: () => { return; },
          style: 'cancel',
        },
        { text: 'Ya', onPress: () => this.removeImage(index) },
      ],
      { cancelable: false },
    );


  }
navigatePage(){
  pageName = this.pageName; 
if(pageName=='add') Actions.AddProduct({data:{images:this.imagesUrl,product:this.product}});
else Actions.EditProductPage({data:{images:this.imagesUrl,product:this.product}})


}
  onSubmit = () => {
    const allImages = this.uploadImages;
 
    if(allImages.length==0) this.navigatePage();
    var index = this.imagesUrl.length;

for(let photo of allImages){

  this.uploadImage(photo,index);
  index++;
 }

//Actions.AddProduct({data:{images:this.imagesUrl}});
  }
  render() {
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}
            >
              <View>
                <Text style={styles.btnTxt}>Pick image</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== 'x' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View
                    style={[styles.progressBar, { width: `${progress}%` }]}
                  />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.onSubmit}
                  disabled={uploading}
                >
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Simpan</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontWeight: '600',
                  paddingTop: 20,
                  alignSelf: 'center'
                }}
              >
                {images.length > 0
                  ? 'Your uploaded images'
                  : 'There is no image you uploaded'}
              </Text>
            </View>
            <FlatList
              numColumns={2}
              style={{ marginTop: 20 }}
              data={images}
              renderItem={({ item: image, index }) => (
                <TouchableOpacity onPress={() => this.promptPull(index)}>
                <ImageRow
                  windowWidth={windowWidth}
                  image={image}
                  popImage={() => this.removeImage(index)}
                /></TouchableOpacity>
              )}
              keyExtractor={index => index}
            />
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});