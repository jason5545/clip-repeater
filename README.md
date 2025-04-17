# 影片片段重複播放器（行動裝置版）

這是一個跨平台的 React Native 應用程式，可以讓您在行動裝置上儲存和重複播放影片的特定片段。

## 功能特點

- 支援輸入影片網址、曲名和時間段
- 自動儲存已設定的片段
- 點擊列表中的項目即可重複播放該片段
- 支援 iOS 和 Android 平台
- 直覺的觸控介面

## 安裝需求

1. Node.js 16.0 或更新版本
2. npm 或 yarn
3. React Native CLI
4. iOS 開發需要 Xcode（僅限 macOS）
5. Android 開發需要 Android Studio

## 安裝步驟

1. 安裝必要的開發工具：
   ```bash
   # 安裝 React Native CLI
   npm install -g react-native-cli
   
   # 安裝專案依賴
   npm install
   ```

2. 執行應用程式：
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 使用方法

1. 開啟應用程式
2. 點擊「新增片段」按鈕
3. 輸入影片網址、曲名和時間段
4. 點擊「儲存」按鈕
5. 在列表中點擊項目即可播放該片段

## 注意事項

- 請確保影片網址是可播放的
- 時間格式必須為「分:秒-分:秒」的格式
- 所有欄位都必須填寫
- 首次執行時需要授予應用程式存取儲存空間的權限 