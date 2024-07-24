import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    initialContacts: [
      { id: 'id-1', name: 'Jennie Kim', number: '459-12-56' },
      { id: 'id-2', name: 'Kim Jisoo', number: '443-89-12' },
      { id: 'id-3', name: 'Im Nayeon', number: '645-17-79' },
      { id: 'id-4', name: `Mary Kris Malenab`, number: '227-91-26' },
    ],
  },
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.initialContacts.push(action.payload);
      },
      // prepare: (name, number) => {
      //     return {
      //         payload: {
      //             id: nanoid(),
      //             name,
      //             number,
      //         }
      //     }
      // }
    },
    deleteContact: {
      reducer: (state, action) => {
        const index = state.initialContacts.findIndex(
          contact => contact.id === action.payload
        );
        if (index !== -1) {
          state.initialContacts.splice(index, 1);
        }
      },
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
