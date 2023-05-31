import Contacts from 'react-native-contacts';
import { requestContactsPermission } from './Permissions'

async function getAllContacts() {
  const permissionGranted = await requestContactsPermission();
  if (permissionGranted) {
    Contacts.getAll()
      .then(contacts => {
        return contacts;
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log('Cannot access contacts');
  }
}

async function getContact(name) {
  const permissionGranted = await requestContactsPermission();
  if (permissionGranted) {
    try {
      const contacts = await Contacts.getContactsMatchingString(name);
      return contacts[0]?.phoneNumbers[0]?.number;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Cannot access contacts');
    return null;
  }
}

export { getAllContacts ,getContact};