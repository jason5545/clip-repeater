declare module '@react-navigation/native' {
  import * as React from 'react';

  export interface NavigationContainerProps {
    children: React.ReactNode;
  }

  export class NavigationContainer extends React.Component<NavigationContainerProps> {}

  export function useNavigation(): {
    navigate: (routeName: string, params?: any) => void;
    goBack: () => void;
  };
}

declare module '@react-navigation/native-stack' {
  import * as React from 'react';

  export interface StackNavigatorProps {
    initialRouteName?: string;
    screenOptions?: any;
    children?: React.ReactNode;
  }

  export interface ScreenProps {
    name: string;
    component: React.ComponentType<any>;
    options?: any;
  }

  export function createNativeStackNavigator(): {
    Navigator: React.ComponentType<StackNavigatorProps>;
    Screen: React.ComponentType<ScreenProps>;
  };
} 