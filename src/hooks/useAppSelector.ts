/**
 * APP SELECTOR HOOK
 * 
 * THIS HOOK PROVIDES TYPE-SAFE ACCESS TO THE REDUX STATE
 * IT ENSURES PROPER TYPE CHECKING WHEN SELECTING STATE
 */

import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

// USE THROUGHOUT YOUR APP INSTEAD OF PLAIN useSelector
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
