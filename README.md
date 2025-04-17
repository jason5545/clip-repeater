# 影片片段重複器

這是一個使用 React Native 開發的應用程式，可以指定影片的特定片段並重複播放。

## 功能

- 載入各種來源的影片
- 設定起始時間和結束時間
- 自動循環播放選定的片段
- 支援多個平台：iOS、Android 和網頁

## 開發設置

### 系統需求

- Node.js 20 或以上
- npm 或 yarn
- React Native 開發環境

### 安裝

1. 克隆此存儲庫：
   ```
   git clone https://github.com/yourusername/clip-repeater.git
   cd clip-repeater
   ```

2. 安裝依賴：
   ```
   npm install
   ```

### 執行開發版本

- **網頁版**：
  ```
  npm start
  ```

- **iOS**：
  ```
  npm run ios
  ```

- **Android**：
  ```
  npm run android
  ```

### Android 開發設置

若要設置 Android 開發環境，需要以下步驟：

1. 安裝 Android Studio 和 Android SDK
2. 設置 ANDROID_HOME 環境變量指向 Android SDK 位置
3. 生成 debug.keystore（如果不存在）：
   ```
   cd android/app
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
   ```

4. 如需發佈版本，請在 `android/gradle.properties` 中設置您的簽名密鑰資訊

## GitHub Actions 工作流程

本專案包含自動化編譯工作流程，它能夠：

- 編譯多平台應用程式（Windows、macOS、Linux）
- 編譯 Android APK
- 在發佈標籤時自動創建發佈版本

## 貢獻

歡迎提交問題和貢獻！請使用拉取請求。 