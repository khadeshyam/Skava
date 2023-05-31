import { PermissionsAndroid } from 'react-native';

async function requestPhoneCallPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Phone Call Permission',
          message: 'This app requires permission to make phone calls.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Phone call permission granted');
      } else {
        console.log('Phone call permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  async function requestContactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts permission granted');
        return true;
      } else {
        console.log('Contacts permission denied');
        return false;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
  


export {requestPhoneCallPermission,requestContactsPermission};
