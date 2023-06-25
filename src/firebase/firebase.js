import firestore from '@react-native-firebase/firestore';

export const fetchUser = async (message) => {
    const userDocument = await firestore()
      .collection('users')
      .doc(message)
      .get();
    
    const data = userDocument.exists ? userDocument.data() : null;
    return data;
  }