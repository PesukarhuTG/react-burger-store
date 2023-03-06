import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearOrder } from "../order/orderSlice";
import { closeModal } from "../modalDelivery/modalDeliverySlice";

const initialState = {
  name: '',
  phone: '',
  format: 'delivery',
  address: '',
  floor: '',
  intercom: '',
  error: null,
  errors: {},
  touch: false,
};

export const submitForm = createAsyncThunk(
  'form/submit', async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://cloudy-slash-rubidium.glitch.me/api/order',
          { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
      if (!response.ok) {
        throw new Error(`Что-то пошло не так: ${response.statusText}`);
      }

      dispatch(clearOrder());
      dispatch(closeModal());

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value; // one reducers for all fields
    },
    setError: (state, action) => ({
      ...state,
      errors: action.payload,
    }),
    clearError: (state) => {
      state.error = {};
    },
    changeTouch: (state) => {
      state.touch = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.response = null;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'success';
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
});

export const { updateFormValue, setError, clearError, changeTouch } = formSlice.actions;
export default formSlice.reducer;

export const validateForm = () => (dispatch, getState) => {
  const form = getState().form; //get our form
  const errors = {
  };

  if (!form.name) {
    errors.name = 'Поле "Имя" обязательно к заполнению';
  }

  if (!form.phone) {
    errors.phone = 'Поле "Телефон" обязательно к заполнению';
  }

  if (!form.address && form.format === 'delivery') {
    errors.address = 'Поле "Адрес" обязательно к заполнению';
  }

  if (!form.floor && form.format === 'delivery') {
    errors.floor = 'Поле "Этаж" обязательно к заполнению';
  }

  if (form.format === 'pickup') {
    dispatch(updateFormValue({ field: 'address', value: ''}));
    dispatch(updateFormValue({ field: 'floor', value: ''}));
  }

  if (Object.keys.length) {
    dispatch(setError(errors));
  } else {
    dispatch(clearError(errors));
  }

};