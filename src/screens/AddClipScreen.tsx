import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useClips } from '../context/ClipContext';

const AddClipScreen = () => {
  const navigation = useNavigation();
  const { addClip } = useClips();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  // 使用 useMemo 優化表單驗證
  const isFormValid = useMemo(() => {
    return url.trim() !== '' && title.trim() !== '' && validateTimeRange(timeRange);
  }, [url, title, timeRange]);

  // 優化使用回調函數
  const validateTimeRange = useCallback((time: string) => {
    if (!time) return false;
    
    const regex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (!regex.test(time)) {
      return false;
    }
    
    const [start, end] = time.split('-');
    const [startMin, startSec] = start.split(':').map(Number);
    const [endMin, endSec] = end.split(':').map(Number);
    
    // 驗證時間格式有效性
    if (startMin < 0 || startMin > 59 || startSec < 0 || startSec > 59 ||
        endMin < 0 || endMin > 59 || endSec < 0 || endSec > 59) {
      return false;
    }
    
    return startMin * 60 + startSec < endMin * 60 + endSec;
  }, []);

  // 處理 URL 輸入變更
  const handleUrlChange = useCallback((text: string) => {
    setUrl(text);
    setError('');
  }, []);

  // 處理標題輸入變更
  const handleTitleChange = useCallback((text: string) => {
    setTitle(text);
    setError('');
  }, []);

  // 處理時間範圍輸入變更
  const handleTimeRangeChange = useCallback((text: string) => {
    setTimeRange(text);
    setError('');
  }, []);

  // 優化保存邏輯
  const handleSave = useCallback(() => {
    Keyboard.dismiss();
    
    if (!url || !title || !timeRange) {
      setError('請填寫所有欄位');
      return;
    }

    if (!validateTimeRange(timeRange)) {
      setError('時間格式不正確，請使用 00:00-01:30 格式');
      return;
    }

    addClip({
      url: url.trim(),
      title: title.trim(),
      timeRange: timeRange.trim(),
    });

    setShowSnackbar(true);
    
    // 延遲導航以顯示儲存成功訊息
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  }, [url, title, timeRange, addClip, navigation, validateTimeRange]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <TextInput
          label="影片網址"
          value={url}
          onChangeText={handleUrlChange}
          style={styles.input}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="url"
        />
        <TextInput
          label="曲名"
          value={title}
          onChangeText={handleTitleChange}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="時間段（格式：00:00-01:30）"
          value={timeRange}
          onChangeText={handleTimeRangeChange}
          style={styles.input}
          mode="outlined"
          placeholder="00:00-01:30"
          keyboardType="numbers-and-punctuation"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button 
          mode="contained" 
          onPress={handleSave} 
          style={styles.button}
          disabled={!isFormValid}
        >
          儲存
        </Button>
      </View>
      
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={2000}
      >
        片段已成功儲存！
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default React.memo(AddClipScreen); 