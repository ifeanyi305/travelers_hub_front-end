import { createSlice } from '@reduxjs/toolkit';
import deleteReservation from './deleteReservations';
import getReservations from './getReservations';
import postReservations from './postReservations';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    pending: false,
    filterby: '',
    change: false,
    message: '',
    selected: 'All',
    toBeEdited: null,
    data: [],
  },
  reducers: {
    filterReservations: (state, action) => ({
      ...state,
      filterby: action.payload,
    }),
    selectedReservations: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => ({
        ...state,
        pending: true,
        err: '',
        message: '',
      }))
      .addCase(getReservations.fulfilled, (state, action) => {
        if (action.payload.sucess) {
          return {
            ...state,
            pending: false,
            err: '',
            message: '',
            data: action.payload.data,
          };
        }

        return {
          ...state,
          pending: false,
          err: action.payload.err,
          message: '',
        };
      })
      .addCase(getReservations.rejected, (state, action) => ({
        ...state,
        pending: false,
        err: action.payload.message,
      }))
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        pending: true,
        err: '',
        message: '',
      }))
      .addCase(postReservations.pending, (state) => ({
        ...state,
        err: '',
        message: '',
        pending: true,
      }))
      .addCase(postReservations.fulfilled, (state, action) => {
        if (action.payload.success) {
          return {
            ...state,
            pending: false,
            message: action.payload.message,
            change: !state.change,
          };
        }
        return {
          ...state,
          pending: false,
          change: !state.change,
          message: '',
          err: action.payload.err,
        };
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        if (action.payload.success) {
          return {
            ...state,
            pending: false,
            message: action.payload.message,
            err: '',
            change: !state.change,
          };
        }
        return {
          ...state,
          pending: false,
          err: action.payload.message,
          message: '',
          change: !state.change,
        };
      })
      .addCase('reservations/cleanFlash', (state) => ({
        ...state,
        message: null,
        err: null,
      }));
  },
});

export default reservationSlice.reducer;
export const { filterReservations, selectedReservations } = reservationSlice.actions;
