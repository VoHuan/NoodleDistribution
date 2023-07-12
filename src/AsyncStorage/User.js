import AsyncStorage from '@react-native-async-storage/async-storage';


export const getUserFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Error getting user from AsyncStorage:', e);
      return null;
    }
  };

  
export const saveUserToAsyncStorage = async (user) => {
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonValue);
        console.log('User saved to AsyncStorage:', user);
    } catch (e) {
        console.log('Error saving user to AsyncStorage:', e);
    }
};