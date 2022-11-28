import React, { useEffect, useState } from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import Layout from './shared/Layout/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList/CardsList';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { rootReducer } from './shared/store/store';
import thunk from 'redux-thunk';
import { Post } from './shared/Post';
import NotFound from './pages/NotFound';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( thunk),
});


const AppComponent = () => {
  const[mounted, setMounted] = useState(false);
  useEffect(() => {setMounted(true);},[])
  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
            <Layout>
              <Header />
              <Content>
                <Routes>
                  <Route path='/posts/:id' element={<Post />} />
                  <Route path='/auth' element={<Navigate replace to='/posts'/>} />
                  <Route path='/' element={<Navigate replace to='/posts'/>} />
                  <Route path='/posts' element={<CardsList />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Content>
            </Layout>
        </BrowserRouter>
      )}
    </Provider>
  );
};

export const App = hot(() => <AppComponent />);
