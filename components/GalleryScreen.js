import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import * as MediaLibrary from "expo-media-library";

import FotoItem from './FotoItem';

class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: [],
        selectedPhotos: [],
        columnNumber: 4,
        isGrid: true,
        screenW: Dimensions.get("screen").width,
        screenH: Dimensions.get("screen").height,
    };
    this._idk = null;

    this.gridOrList = this.gridOrList.bind(this);
    this.getPhotoComponent = this.getPhotoComponent.bind(this);
    this.addPhotoToSelected = this.addPhotoToSelected.bind(this);
    this.removePhotoFromSelected = this.removePhotoFromSelected.bind(this);
    this.updatePhotoSelection = this.updatePhotoSelection.bind(this);
    this.showBigPhoto = this.showBigPhoto.bind(this);
    this.setPhotos = this.setPhotos.bind(this);
    this.goToCamera = this.goToCamera.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    
  }

  async componentDidMount()
  {
    this._idk = this.props.navigation.addListener('focus', async () => {
      await this.setPhotos();
    });
    await this.setPhotos();
  }

  componentWillUnmount() {
    this._idk();
  }

  async setPhotos()
  {
    let album = await MediaLibrary.getAlbumAsync("DCIM");
    let obj = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 100,
        mediaType: ["photo"],
    });
    this.setState({
            photos: [...obj.assets],
        });
  }


  async updatePhotoSelection( photoID )
  {
    if( this.state.selectedPhotos.includes( photoID ) )
    {
      await this.removePhotoFromSelected( photoID );
      return false;
    }
    else
    {
      await this.addPhotoToSelected( photoID );
      return true;
    }
  }

  async addPhotoToSelected( photoID )
  {
    let arr = this.state.selectedPhotos;
    arr.push( photoID );
    this.setState({ selectedPhotos: [...arr] })
  }

  async removePhotoFromSelected( photoID )
  {
    let arr = this.state.selectedPhotos.filter( (el)=>{
      return !( el == photoID )
    });
    this.setState({ selectedPhotos: [...arr] })
  }

  async deleteSelected()
  {
    if( !(this.state.selectedPhotos.length > 0) )
      return;
    await MediaLibrary.deleteAssetsAsync( this.state.selectedPhotos );
    await this.setPhotos();
  }


  gridOrList()
  {
    this.setState({
        isGrid: !this.state.isGrid,
        columnNumber: !this.state.isGrid ? 4 : 1
    });
  }

  goToCamera()
  {
    this.props.navigation.navigate( "camera" );
  }

  getPhotoComponent( item )
  {
    if( !item )
        return;

    item = item.item;
    const w = this.state.screenW / ( this.state.isGrid ? 4 : 1 );
    const h = this.state.screenH / ( this.state.isGrid ? 10 : 4 );
    return ( 
        <FotoItem src={ item.uri } showBigPhoto={ this.showBigPhoto } updatePhotoSelection={ this.updatePhotoSelection } width={ w } height={ h } id={ item.id } />
     );
  }

  showBigPhoto( photoId )
  {
      const photoObj = this.state.photos.find( ( el ) => { return el.id == photoId } );
      this.props.navigation.navigate( "bigPhoto", { photo: photoObj } );
  }

  render() {
    return (
      <View style={ss.main}>
        <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center" }}>
          <TouchableOpacity style={ss.button} onPress={ this.gridOrList } >
              <Text style={ss.btnText}>GRID / LIST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ss.button} onPress={ this.goToCamera } >
              <Text style={ss.btnText}>CAMERA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ss.button} onPress={ this.deleteSelected } >
              <Text style={ss.btnText}>DELETE SELECTED</Text>
          </TouchableOpacity>
        </View>

        <FlatList
            numColumns={this.state.columnNumber}
            key={this.state.columnNumber}

            data={this.state.photos}
            renderItem={ (item)=> this.getPhotoComponent(item) }
        />
      </View>
    );
  }
}



const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    button: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        // backgroundColor: "red",
        width: "100%",
        padding: 10
        
    },
    btnText: {
        textAlign: "center", 
        fontSize: Dimensions.get( "screen" ).height / 40,
        color: "whitesmoke", 
        fontWeight: "bold",
        fontFamily: "monospace" }
  });
  

export default GalleryScreen;
