import React, { useEffect, useRef, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import { Button } from 'react-native-paper';
import { Clip } from '../context/ClipContext';

interface VideoPlayerProps {
  clip: Clip;
  onClose: () => void;
}

const VideoPlayer = ({ clip, onClose }: VideoPlayerProps) => {
  // 建立可變引用
  const player = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  
  // 使用 useMemo 緩存計算結果
  const { startSeconds, endSeconds, duration } = useMemo(() => {
    const [startTime, endTime] = clip.timeRange.split('-');
    const [startMin, startSec] = startTime.split(':').map(Number);
    const [endMin, endSec] = endTime.split(':').map(Number);
    const startSeconds = startMin * 60 + startSec;
    const endSeconds = endMin * 60 + endSec;
    const duration = endSeconds - startSeconds;
    
    return { startSeconds, endSeconds, duration };
  }, [clip.timeRange]);

  useEffect(() => {
    if (player.current) {
      player.current.seek(startSeconds);
    }
  }, [startSeconds]);

  const handleProgress = (data: OnProgressData) => {
    // 只有當影片準備好後才檢查進度
    if (!isReady) return;
    
    // 如果當前時間超過了結束時間，就跳回開始時間
    if (data.currentTime >= endSeconds) {
      player.current?.seek(startSeconds);
    }
  };

  const handleLoad = (data: OnLoadData) => {
    setIsReady(true);
    player.current?.seek(startSeconds);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: clip.url }}
        style={styles.video}
        repeat={false} // 由我們自行控制循環
        onProgress={handleProgress}
        onLoad={handleLoad}
        progressUpdateInterval={250} // 優化更新間隔，降低性能消耗
        controls={true}
        // @ts-ignore
        ref={player}
      />
      <Button
        mode="contained"
        onPress={onClose}
        style={styles.closeButton}
      >
        關閉
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 9 / 16,
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default React.memo(VideoPlayer); // 使用 React.memo 避免不必要的重新渲染 