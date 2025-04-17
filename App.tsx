import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import AddClipScreen from './src/screens/AddClipScreen';
import { ClipProvider } from './src/context/ClipContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <ClipProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: '影片片段重複播放器' }}
            />
            <Stack.Screen 
              name="AddClip" 
              component={AddClipScreen} 
              options={{ title: '新增片段' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ClipProvider>
    </PaperProvider>
  );
};

export default App; 