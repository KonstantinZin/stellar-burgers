import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectOrders,
  selectFeedIsLoading
} from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectFeedIsLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
