declare module 'react-native-paper' {
  import * as React from 'react';
  import { ViewProps, TextProps as RNTextProps, ImageProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

  export interface ButtonProps {
    mode?: 'text' | 'outlined' | 'contained';
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    disabled?: boolean;
    labelStyle?: StyleProp<TextStyle>;
  }

  export class Button extends React.Component<ButtonProps> {}
  
  export interface TextInputProps {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: StyleProp<ViewStyle>;
    mode?: 'flat' | 'outlined';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'url' | 'numbers-and-punctuation';
    secureTextEntry?: boolean;
    placeholder?: string;
    error?: boolean;
  }

  export class TextInput extends React.Component<TextInputProps> {}

  export interface ListItemProps {
    title?: string;
    description?: string;
    onPress?: () => void;
    right?: (props: { color: string }) => React.ReactNode;
    left?: (props: { color: string }) => React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }

  export interface ListIconProps {
    icon: string;
    onPress?: () => void;
  }

  export namespace List {
    export class Item extends React.Component<ListItemProps> {}
    export class Section extends React.Component<ViewProps> {}
    export class Icon extends React.Component<ListIconProps> {}
  }

  export interface FABProps {
    icon: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
  }

  export class FAB extends React.Component<FABProps> {}

  export interface DialogProps {
    visible: boolean;
    onDismiss?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }

  export namespace Dialog {
    export class Title extends React.Component<RNTextProps> {}
    export class Content extends React.Component<ViewProps> {}
    export class Actions extends React.Component<ViewProps> {}
  }

  export class Dialog extends React.Component<DialogProps> {}

  export interface PortalProps {
    children: React.ReactNode;
  }

  export class Portal extends React.Component<PortalProps> {}

  export interface SnackbarProps {
    visible: boolean;
    onDismiss?: () => void;
    duration?: number;
    children?: React.ReactNode;
  }

  export class Snackbar extends React.Component<SnackbarProps> {}

  export interface TextProps extends RNTextProps {
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
  }

  export class Text extends React.Component<TextProps> {}

  export interface ActivityIndicatorProps {
    animating?: boolean;
    color?: string;
    size?: 'small' | 'large' | number;
    style?: StyleProp<ViewStyle>;
  }

  export class ActivityIndicator extends React.Component<ActivityIndicatorProps> {}

  export interface PaperProviderProps {
    children: React.ReactNode;
  }

  export class Provider extends React.Component<PaperProviderProps> {}
} 