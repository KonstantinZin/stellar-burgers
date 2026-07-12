import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { removeIngredient } from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems
}) => {
  const dispatch = useDispatch();

  const handleMoveDown = () => {};

  const handleMoveUp = () => {};

  const handleClose = () => {
    dispatch(removeIngredient(index));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
};
