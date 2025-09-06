import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id?: string;
  firstname?: string;
  lastname?: string;
};

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      // Add other user properties here as needed
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
