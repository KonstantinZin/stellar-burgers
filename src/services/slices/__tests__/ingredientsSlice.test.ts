import { describe, test, expect } from '@jest/globals';
import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';

describe('редьюсер ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('возвращает начальное состояние при неизвестном экшене', () => {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('обрабатывает fetchIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 10,
        price: 10,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const result = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(ingredients);
  });

  test('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка');
  });
});
