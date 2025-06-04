/**
 * APP DISPATCH HOOK
 * 
 * THIS HOOK PROVIDES TYPE-SAFE ACCESS TO THE REDUX DISPATCH FUNCTION
 * IT ENSURES PROPER TYPE CHECKING WHEN DISPATCHING ACTIONS
 */

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// USE THROUGHOUT YOUR APP INSTEAD OF PLAIN useDispatch
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
