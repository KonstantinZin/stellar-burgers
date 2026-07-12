import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectOrders, fetchFeeds } from '../../services/slices/feedSlice';
import {
  selectUserOrders,
  fetchUserOrders
} from '../../services/slices/userOrdersSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useState } from 'react';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const feedOrders = useSelector(selectOrders);
  const userOrders = useSelector(selectUserOrders);
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    let order = feedOrders.find((o) => o.number === parseInt(number || ''));
    if (!order) {
      order = userOrders.find((o) => o.number === parseInt(number || ''));
    }
    if (!order && !feedOrders.length) {
      dispatch(fetchFeeds());
    }
    if (!order && !userOrders.length) {
      dispatch(fetchUserOrders());
    }
    if (order) {
      setOrderData(order);
    }
  }, [number, feedOrders, userOrders, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
