import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


export const updateNumberNoodleToFirebase = createAsyncThunk(
    'user/updateNumberNoodleToFirebase',
    async ({ userId, newData }) => {
        try {
            await firestore()
                .collection('users')
                .doc(userId)
                .update({numberNoodle: newData,});
            console.log('User updated successfully');
            //return true
        } catch (error) {
            console.log('Failed to update user: ', error);
            //return false
        }
    }
);


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (message) => {
        try {
            const userDocument = await firestore()
                .collection('users')
                .doc(message)
                .get();

            const user = userDocument.exists ? userDocument.data() : null;
            user.document = message
            if (user.Image != '') {
                user.Image = await storage().ref('images/' + user.Image).getDownloadURL();
            }
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // .addCase(updateNumberNoodleToFirebase.pending, state => {
            //     state.status = 'loading';
            //     state.error = null;
            // })
            // .addCase(updateNumberNoodleToFirebase.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     //state.user = action.payload;
            // })
            // .addCase(updateNumberNoodleToFirebase.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.error.message ?? 'Faile to update ';
            // })

            .addCase(fetchUser.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});


export default userSlice.reducer;