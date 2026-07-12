import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../services/slices/userOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
