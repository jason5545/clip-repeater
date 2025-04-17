import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Clip {
  id: string;
  url: string;
  title: string;
  timeRange: string;
}

interface ClipContextType {
  clips: Clip[];
  addClip: (clip: Omit<Clip, 'id'>) => void;
  removeClip: (id: string) => void;
  isLoading: boolean;
}

const ClipContext = createContext<ClipContextType | undefined>(undefined);

// 防抖函數
const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const STORAGE_KEY = 'clips';

export const ClipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 使用 useCallback 緩存函數
  const loadClips = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedClips = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedClips) {
        setClips(JSON.parse(savedClips));
      }
    } catch (error) {
      console.error('載入片段失敗：', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 防抖保存功能
  const saveClips = useCallback(
    debounce(async (newClips: Clip[]) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newClips));
      } catch (error) {
        console.error('儲存片段失敗：', error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    loadClips();
  }, [loadClips]);

  const addClip = useCallback((clip: Omit<Clip, 'id'>) => {
    const newClip = {
      ...clip,
      id: Date.now().toString(),
    };
    setClips(prevClips => {
      const newClips = [...prevClips, newClip];
      saveClips(newClips);
      return newClips;
    });
  }, [saveClips]);

  const removeClip = useCallback((id: string) => {
    setClips(prevClips => {
      const newClips = prevClips.filter(clip => clip.id !== id);
      saveClips(newClips);
      return newClips;
    });
  }, [saveClips]);

  // 使用 useMemo 緩存上下文值
  const contextValue = useMemo(() => ({
    clips,
    addClip,
    removeClip,
    isLoading
  }), [clips, addClip, removeClip, isLoading]);

  return (
    <ClipContext.Provider value={contextValue}>
      {children}
    </ClipContext.Provider>
  );
};

export const useClips = () => {
  const context = useContext(ClipContext);
  if (context === undefined) {
    throw new Error('useClips must be used within a ClipProvider');
  }
  return context;
}; 