import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, FAB, Portal, Dialog, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useClips } from '../context/ClipContext';
import VideoPlayer from '../components/VideoPlayer';

// 分離出列表項組件以便使用 memo 優化渲染
const ClipItem = React.memo(({ clip, onPlay, onDelete }) => {
  return (
    <List.Item
      title={clip.title}
      description={clip.timeRange}
      onPress={() => onPlay(clip.id)}
      right={() => (
        <List.Icon
          icon="delete"
          onPress={() => onDelete(clip.id)}
        />
      )}
    />
  );
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const { clips, removeClip, isLoading } = useClips();
  const [selectedClip, setSelectedClip] = React.useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handlePlayClip = useCallback((clipId) => {
    setSelectedClip(clipId);
  }, []);

  const handleDeleteClip = useCallback((clipId) => {
    setSelectedClip(clipId);
    setShowDeleteDialog(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedClip) {
      removeClip(selectedClip);
      setShowDeleteDialog(false);
      setSelectedClip(null);
    }
  }, [selectedClip, removeClip]);

  const dismissDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  const navigateToAddClip = useCallback(() => {
    navigation.navigate('AddClip');
  }, [navigation]);

  const handleClosePlayer = useCallback(() => {
    setSelectedClip(null);
  }, []);

  // 使用 useMemo 緩存找到的 clip 對象
  const selectedClipObject = useMemo(() => {
    if (!selectedClip) return null;
    return clips.find(c => c.id === selectedClip);
  }, [selectedClip, clips]);

  // 渲染列表項函數
  const renderItem = useCallback(({ item }) => (
    <ClipItem
      clip={item}
      onPlay={handlePlayClip}
      onDelete={handleDeleteClip}
    />
  ), [handlePlayClip, handleDeleteClip]);

  // 提供唯一 key 給 FlatList
  const keyExtractor = useCallback((item) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {clips.length === 0 ? (
        <View style={styles.emptyState}>
          <Text>尚未添加任何影片片段</Text>
        </View>
      ) : (
        <FlatList
          data={clips}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      )}

      {selectedClipObject && (
        <VideoPlayer
          clip={selectedClipObject}
          onClose={handleClosePlayer}
        />
      )}

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={dismissDialog}>
          <Dialog.Title>確認刪除</Dialog.Title>
          <Dialog.Content>
            <Text>確定要刪除這個片段嗎？</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissDialog}>取消</Button>
            <Button onPress={confirmDelete}>刪除</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={navigateToAddClip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(HomeScreen); 