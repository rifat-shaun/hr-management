import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
});

export default employeeSlice.reducer;
