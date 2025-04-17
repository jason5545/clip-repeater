declare module 'react' {
  export = React;
  export as namespace React;
  
  namespace React {
    type ReactNode = 
      | React.ReactElement
      | string
      | number
      | boolean
      | null
      | undefined
      | ReadonlyArray<ReactNode>;
      
    interface ReactElement<P = any> {
      type: any;
      props: P;
      key: string | null;
    }
    
    class Component<P = {}, S = {}> {
      constructor(props: P, context?: any);
      props: Readonly<P>;
      state: Readonly<S>;
      setState(state: S | ((prevState: Readonly<S>, props: Readonly<P>) => S | null), callback?: () => void): void;
      forceUpdate(callback?: () => void): void;
      render(): ReactNode;
    }
    
    // 為 ref 添加必要的型別
    type Ref<T> = RefCallback<T> | RefObject<T> | null;
    type RefCallback<T> = (instance: T | null) => void;
    
    interface RefObject<T> {
      readonly current: T | null;
    }
    
    // 為 forwardRef 添加型別
    interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
      defaultProps?: Partial<P>;
    }
    
    interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
      displayName?: string;
    }
    
    interface ExoticComponent<P = {}> {
      (props: P): ReactElement | null;
    }
    
    interface RefAttributes<T> {
      ref?: Ref<T>;
    }
    
    // 必要的 Hooks
    function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
    function useEffect(effect: () => (void | (() => void)), deps?: ReadonlyArray<any>): void;
    function useRef<T>(initialValue: T): { current: T };
    function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
    function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
    function useContext<T>(context: React.Context<T>): T;
    
    // Context API
    interface ProviderProps<T> {
      value: T;
      children?: ReactNode;
    }
    
    interface ConsumerProps<T> {
      children: (value: T) => ReactNode;
    }
    
    interface Context<T> {
      Provider: React.ComponentType<ProviderProps<T>>;
      Consumer: React.ComponentType<ConsumerProps<T>>;
    }
    
    function createContext<T>(defaultValue: T): Context<T>;
    
    // Memo API
    function memo<P extends object>(
      Component: React.ComponentType<P>,
      propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
    ): React.ComponentType<P>;
    
    // 為 forwardRef 添加函數
    function forwardRef<T, P = {}>(
      render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): React.ForwardRefExoticComponent<P & React.RefAttributes<T>>;
  }
}

declare module 'react-native' {
  import React = require('react');
  
  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
    testID?: string;
    nativeID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
  }
  
  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    onPress?: () => void;
    testID?: string;
    selectable?: boolean;
  }
  
  export interface ImageProps {
    style?: any;
    source: { uri: string } | number;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    onLoad?: () => void;
    onError?: (error: any) => void;
    testID?: string;
  }

  export interface ScrollViewProps extends ViewProps {
    contentContainerStyle?: any;
    horizontal?: boolean;
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
    scrollEnabled?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
    onScroll?: (event: any) => void;
  }
  
  export interface FlatListProps<T> extends ScrollViewProps {
    data: ReadonlyArray<T>;
    renderItem: (info: { item: T; index: number }) => React.ReactElement | null;
    keyExtractor: (item: T, index: number) => string;
    ItemSeparatorComponent?: React.ComponentType<any> | null;
    ListHeaderComponent?: React.ComponentType<any> | null;
    ListFooterComponent?: React.ComponentType<any> | null;
    ListEmptyComponent?: React.ComponentType<any> | null;
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
    windowSize?: number;
    onRefresh?: () => void;
    refreshing?: boolean;
  }
  
  export type StyleProp<T> = T | T[] | false | null | undefined;
  export type ViewStyle = any;
  export type TextStyle = any;
  export type ImageStyle = any;
  
  export class View extends React.Component<ViewProps> {}
  export class Text extends React.Component<TextProps> {}
  export class Image extends React.Component<ImageProps> {}
  export class ScrollView extends React.Component<ScrollViewProps> {}
  export class FlatList<T> extends React.Component<FlatListProps<T>> {}
  
  export const Dimensions: {
    get: (dimension: 'window' | 'screen') => { width: number; height: number };
    addEventListener: (
      type: 'change',
      handler: ({ window, screen }: { window: { width: number; height: number }; screen: { width: number; height: number } }) => void
    ) => void;
    removeEventListener: (
      type: 'change',
      handler: ({ window, screen }: { window: { width: number; height: number }; screen: { width: number; height: number } }) => void
    ) => void;
  };
  
  export const Keyboard: {
    dismiss: () => void;
    addListener: (
      eventType: 'keyboardDidShow' | 'keyboardDidHide' | 'keyboardWillShow' | 'keyboardWillHide',
      listener: (event: any) => void
    ) => { remove: () => void };
  };

  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T;
    flatten: (style: any) => any;
  };
} 