import { Platform, NativeModules } from 'react-native';
const { PhoneCallModule } = NativeModules;

export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  try {
    if (Platform.OS === 'android') {
      PhoneCallModule.makePhoneCall(phoneNumber);
      return;
    }
  }
  catch (err) {
    console.error(err);
  }
};
