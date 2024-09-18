import state from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const Store = combineReducers({ state });

export default Store;
