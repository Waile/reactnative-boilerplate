/**
 * REACT NATIVE BOILERPLATE APP
 * 
 * THIS IS THE MAIN ENTRY POINT FOR THE APPLICATION
 * IT SETS UP REDUX, NAVIGATION, AND THEME PROVIDERS
 */

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { checkAuthStatus } from './src/store/slices/userSlice';

// IGNORE SPECIFIC WARNINGS THAT ARE NOT RELEVANT
LogBox.ignoreLogs([
  // IGNORE WARNINGS ABOUT REANIMATED (COMMON IN DEVELOPMENT)
  'Animated: `useNativeDriver`',
  // ADD ANY OTHER WARNINGS THAT SHOULD BE IGNORED
]);

function App(): React.JSX.Element {
  // CHECK AUTHENTICATION STATUS ON APP START
  useEffect(() => {
    // DISPATCH AUTH CHECK ACTION TO VERIFY IF USER IS ALREADY LOGGED IN
    store.dispatch(checkAuthStatus());
  }, []);

  return (
    // GESTURE HANDLER ROOT FOR REACT NATIVE GESTURE HANDLER
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* REDUX PROVIDER FOR GLOBAL STATE MANAGEMENT */}
      <Provider store={store}>
        {/* APP NAVIGATOR CONTAINS ALL NAVIGATION LOGIC */}
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
