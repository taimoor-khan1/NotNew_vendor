import React from 'react';
import {Platform, RefreshControl, PermissionsAndroid} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
import {showMessage} from 'react-native-flash-message';
import ImageResizer from 'react-native-image-resizer';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {COLORS} from '../constants';

class utils {
  confirmAlert(title, msg) {
    showMessage({
      message: title,
      description: msg,
      type: 'success',
      backgroundColor: COLORS.primary.cherry,
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  isBtnDisable = arr => {
    return arr.some(i => i === '' || i === null || i === undefined);
  };

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={'blue'}
        colors={['white']}
        progressBackgroundColor={'blue'}
      />
    );
  }

  handleBase64 = async image => {
    const fs = RNFetchBlob.fs;
    let imagePath = null;

    const base64Image = await RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', image)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        // console.log(base64Data);
        // remove the file from storage
        fs.unlink(imagePath);
        return `data:image/png;base64,${base64Data}`;
      });

    return base64Image;
  };

  imageResizer = async () => {
    const resizedImage = await ImageResizer.createResizedImage(
      path,
      100,
      100,
      'PNG',
      50,
      0,
    );
    const base64 = await RNFS.readFile(image, 'base64');
    return base64;
  };

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  showResponseError(error) {
    var authErrorRegex = /4[0-9][1-9]/g;
    var serverErrorRegex = /5[0-9][0-9]/g;

    if (error.message === 'Network Error') {
      return 'Please check your network';
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);

        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            var temp = response.data[Object.keys(response.data)[0]];
            error = JSON.stringify(temp).replace('[', '').replace(']', '');
          }
          return error;
        } else if (authErrorRegex.test(errorCode)) {
          return 'Authentication failed';
        } else if (serverErrorRegex.test(errorCode)) {
          return 'Something went wrong with the server';
        }
      } else {
        return error;
      }
    }
  }

  cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text =>
      text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  };

  decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded =>
      encoded
        .match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
  };

  // async saveImageToPhone(image) {
  //   // const REMOTE_IMAGE_PATH =
  //   //   'https://www.rollingstone.com/wp-content/uploads/2019/03/Tame-Impala-Matt-Sav-SYNTK.jpg';
  //   const REMOTE_IMAGE_PATH = image;

  //   if (Platform.OS === 'ios') {
  //     this.confirmAlert('Downloading started....');
  //     CameraRoll.save(REMOTE_IMAGE_PATH)
  //       .then(() => {
  //         this.confirmAlert('Downloaded Successfully.');
  //       })
  //       .catch(e => {
  //         console.log('error ===== >>>>> ', e);
  //         this.confirmAlert('Problem saving file.');
  //       });
  //     // this.downloadImage(REMOTE_IMAGE_PATH);
  //     return;
  //   }
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage Permission Required',
  //         message: 'App needs access to your storage to download Photos',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Once user grant the permission start downloading
  //       console.log('Storage Permission Granted.');
  //       this.downloadImage(REMOTE_IMAGE_PATH);
  //     } else {
  //       // If permission denied then show alert
  //       alert('Storage Permission Not Granted');
  //     }
  //   } catch (err) {
  //     // To handle permission related exception
  //     console.warn(err);
  //   }
  // }

  // downloadImage = REMOTE_IMAGE_PATH => {
  //   // Main function to download the image
  //   this.confirmAlert('Downloading started....');
  //   // To add the time suffix in filename
  //   let date = new Date();
  //   // Image URL which we want to download
  //   let image_URL = REMOTE_IMAGE_PATH;
  //   // Getting the extention of the file
  //   let ext = this.getExtention(image_URL);
  //   ext = '.' + ext[0];
  //   // Get config and fs from RNFetchBlob
  //   // config: To pass the downloading related options
  //   // fs: Directory path where we want our image to download
  //   const {config, fs} = RNFetchBlob;
  //   let PictureDir = fs.dirs.PictureDir;
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       // Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         PictureDir +
  //         '/image_' +
  //         Math.floor(date.getTime() + date.getSeconds() / 2) +
  //         ext,
  //       description: 'Image',
  //     },
  //   };
  //   config(options)
  //     .fetch('GET', image_URL)
  //     .then(res => {
  //       // Showing alert after successful downloading
  //       console.log('res -> ', JSON.stringify(res));
  //       this.confirmAlert('Downloaded Successfully.');
  //     })
  //     .catch(e => {
  //       console.log('error ===== >>>>> ', e);
  //       this.confirmAlert('Problem saving file.');
  //     });
  // };

  getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
}

export default new utils();
