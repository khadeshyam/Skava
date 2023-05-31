import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Appearance,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import Voice from '@react-native-community/voice';
import { requestPhoneCallPermission } from './utils/Permissions';
import { callNumber } from './utils/makeCall';
import { getContact } from './utils/contacts';


const App = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [result, setResult] = useState('');

  const options = {
    textColor: colorScheme == 'dark' ? 'white' : 'black',
  };

  console.log(result);
  console.log(isAvailable);

  useEffect(() => {
    console.log('I am called');

    Voice.onSpeechResults = event => {
      const speechResult = event.value[0];
      setResult(speechResult);
      parseResult(speechResult);
    };

    Voice.onSpeechStart = () => {
      setIsRecording(true);
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };

    Voice.isAvailable().then(available => {
      setIsAvailable(available);
    });

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    requestPhoneCallPermission();

    return () => {
      listener?.remove();
      Voice?.destroy()?.then(Voice?.removeAllListeners());
    };
  }, []);

  const handleStart = async () => {
    try {
      await Voice.start();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStop = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setResult('');
  };

  const parseResult = speechResult => {
    const commands = speechResult.toLowerCase().split(' ');
    const firstCommand = commands[0];
    const secondCommand = commands[1];

    if (firstCommand == "call") {
      const contactName = secondCommand;
      const makeCall = (async () => {
        const number = await getContact(contactName);
        console.log("App.js " + number);
        if (number) {
          callNumber(number);
        }
      })();
    }
    switch (secondCommand) {
      case 'brave':
        Linking.canOpenURL('brave://')
          .then(canOpen => {
            if (!canOpen) {
              // Prompt user to install Google Maps app
              Linking.openURL('market://details?id=com.google.android.apps.brave')
                .catch(err => console.error(err));
            }
          })
          .catch(err => console.error(err));

      case 'facebook':
        Linking.openURL('fb://');
        break;
      case 'instagram':
        Linking.openURL('instagram://');
        break;
      case 'twitter':
        Linking.openURL('twitter://');
        break;
      case 'whatsapp':
        Linking.openURL('https://www.web.whatsapp.com/');
        break;
      case 'youtube':
        Linking.openURL('vnd.youtube://');
        break;
      case 'gmail':
        Linking.openURL('googlegmail://');
        break;
      case 'google':
        Linking.openURL('googlechrome://');
        break;
      case 'maps':
        Linking.openURL('comgooglemaps://');
        break;
      case 'snapchat':
        Linking.openURL('snapchat://');
        break;
      case 'tiktok':
        Linking.openURL('tiktok://');
        break;
      case 'telegram':
        Linking.openURL('tg://');
        break;
      case 'linkedin':
        Linking.openURL('linkedin://');
        break;
      case 'pinterest':
        Linking.openURL('pinterest://');
        break;
      case 'reddit':
        Linking.openURL('reddit://');
        break;
      case 'spotify':
        Linking.openURL('spotify:');
        break;
      case 'contact':
        Linking.openURL('content://com.android.contacts/contacts');
        break;
      case 'phone':
        Linking.openURL('tel:');
        break;
      case 'message':
        Linking.openURL('sms:');
        break;
      case 'email':
        Linking.openURL('mailto:');
        break;
      case 'camera':
        Linking.openURL('googlecamera://');
        break;
      case 'gallery':
        Linking.openURL('content://media/external/images/media');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          color: options.textColor,
          fontSize: 22,
          position: 'absolute',
          top: 20,
        }}>
        {isRecording ? 'Recording' : 'Not Recording'}
      </Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: options.textColor, fontSize: 26 }}>{result}</Text>
      </View>
      {/* <View style={{ marginTop: 20, width:'80%' }}>
        <TextInput
          style={{ height: 100, borderColor: 'gray',borderWidth:1, paddingHorizontal: 10,borderRadius:10 }}
          onChangeText={(text) =>setText(text) }
          value={text}
          placeholder="Enter some text..."
        />
      </View> */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={handleStart}
          style={{
            padding: 10,
            width: 100,
            height: 100,
            justifyContent: 'center',
            backgroundColor: 'green',
            borderRadius: 50,
          }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStop}
          style={{
            padding: 10,
            width: 100,
            height: 100,
            justifyContent: 'center',
            backgroundColor: 'red',
            borderRadius: 50,
          }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>
            Stop
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={() => handleClear()}
          style={{
            padding: 10,
            width: 100,
            backgroundColor: 'grey',
            borderRadius: 5,
            fontSize: 16,
          }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 16 }}>
            clear
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
