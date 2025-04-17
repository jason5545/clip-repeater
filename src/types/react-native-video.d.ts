declare module 'react-native-video' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface OnLoadData {
    currentTime: number;
    duration: number;
    naturalSize: {
      width: number;
      height: number;
      orientation: 'portrait' | 'landscape';
    };
  }

  export interface OnProgressData {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }

  export interface OnBufferData {
    isBuffering: boolean;
  }

  export interface VideoProps extends ViewProps {
    // 來源設定
    source: {
      uri?: string;
      isNetwork?: boolean;
      isCache?: boolean;
      type?: string;
      headers?: {[key: string]: string};
      mainVer?: number;
      patchVer?: number;
    } | number;
    
    // 視頻顯示選項
    posterResizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
    poster?: string;
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'none';
    
    // 播放控制
    paused?: boolean;
    repeat?: boolean;
    muted?: boolean;
    volume?: number;
    rate?: number;
    playInBackground?: boolean;
    playWhenInactive?: boolean;
    ignoreSilentSwitch?: 'ignore' | 'obey';
    disableFocus?: boolean;
    controls?: boolean;
    currentTime?: number;
    progressUpdateInterval?: number;
    useTextureView?: boolean;
    
    // 回調函數
    onLoad?: (data: OnLoadData) => void;
    onLoadStart?: () => void;
    onProgress?: (data: OnProgressData) => void;
    onEnd?: () => void;
    onError?: (error: { error: { '': string; errorString: string } }) => void;
    onBuffer?: (data: OnBufferData) => void;
    onTimedMetadata?: (data: { metadata: Array<{ value: string; identifier: string }> }) => void;
    onAudioBecomingNoisy?: () => void;
    onAudioFocusChanged?: (event: { hasAudioFocus: boolean }) => void;
    onFullscreenPlayerWillPresent?: () => void;
    onFullscreenPlayerDidPresent?: () => void;
    onFullscreenPlayerWillDismiss?: () => void;
    onFullscreenPlayerDidDismiss?: () => void;
    
    // 允許使用 ref
    ref?: React.RefObject<Video> | ((ref: any) => void) | null;
  }

  class Video extends React.Component<VideoProps> {
    seek(time: number, tolerance?: number): void;
    presentFullscreenPlayer(): void;
    dismissFullscreenPlayer(): void;
  }
  
  // 簡單地導出 Video 作為默認導出
  export default Video;
} 