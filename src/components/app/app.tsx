import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoading,
  selectError
} from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../protected-route';
import { Preloader } from '@ui';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/feed/:number'
              element={
                <div className={styles.detailPageWrap}>
                  <OrderInfo />
                </div>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <div className={styles.detailPageWrap}>
                  <p
                    className={`text text_type_main-large ${styles.detailHeader}`}
                  >
                    Детали ингредиента
                  </p>
                  <IngredientDetails />
                </div>
              }
            />

            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <div className={styles.detailPageWrap}>
                    <OrderInfo />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Информация о заказе' onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal
                      title='Информация о заказе'
                      onClose={handleModalClose}
                    >
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      )}
    </div>
  );
};

export default App;
