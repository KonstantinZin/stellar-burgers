import { describe, test, expect } from '@jest/globals';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor
} from '../burgerConstructorSlice';

describe('редьюсер burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const bun = {
    _id: '1',
    name: 'Булка',
    type: 'bun' as const,
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 10,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const main = {
    _id: '2',
    name: 'Котлета',
    type: 'main' as const,
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 20,
    price: 20,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  test('возвращает начальное состояние при неизвестном экшене', () => {
    const result = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('добавляет булку', () => {
    const result = burgerConstructorReducer(initialState, addIngredient(bun));
    expect(result.bun).toEqual(bun);
  });

  test('добавляет начинку', () => {
    const result = burgerConstructorReducer(initialState, addIngredient(main));
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(main);
  });

  test('удаляет ингредиент', () => {
    const state = { bun: null, ingredients: [main] };
    const result = burgerConstructorReducer(state, removeIngredient(0));
    expect(result.ingredients).toHaveLength(0);
  });

  test('очищает конструктор', () => {
    const state = { bun: bun, ingredients: [main] };
    const result = burgerConstructorReducer(state, clearConstructor());
    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(0);
  });
});
