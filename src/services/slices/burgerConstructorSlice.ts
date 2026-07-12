import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const { selectBun, selectConstructorIngredients } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
