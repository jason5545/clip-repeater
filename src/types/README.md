# TypeScript 型別宣告

此目錄包含專案中使用的第三方庫的型別宣告檔案。這些檔案用於解決 TypeScript 編譯器找不到模組或其對應型別宣告的錯誤。

## 型別宣告檔案列表

- `async-storage.d.ts`: 為 @react-native-async-storage/async-storage 提供型別定義
- `modules.d.ts`: 為基本的 React 和 React Native 模組提供型別定義
- `node.d.ts`: 為 NodeJS.Timeout 提供型別定義
- `react-native-paper.d.ts`: 為 react-native-paper 組件庫提供型別定義
- `react-native-video.d.ts`: 為 react-native-video 組件提供型別定義
- `react-navigation.d.ts`: 為 @react-navigation/native 和 @react-navigation/native-stack 提供型別定義

## 如何解決型別錯誤

如果您遇到「找不到模組或其對應的型別宣告」的錯誤，您有以下選項：

1. **使用現有的型別宣告**：如果該模組已有型別定義，確保您的 tsconfig.json 中的路徑設定正確。

2. **安裝官方型別定義**：對於許多常見的庫，可以安裝其 @types 版本，例如：
   ```bash
   npm install --save-dev @types/react @types/react-native
   ```

3. **建立自訂型別宣告**：如果無法通過前兩種方式解決，您可以在 `src/types` 目錄中建立自訂的 `.d.ts` 檔案，定義模組的介面和型別。

4. **修改 tsconfig.json**：確保您的 tsconfig.json 包含以下設定：
   ```json
   {
     "compilerOptions": {
       "skipLibCheck": true,
       "typeRoots": [
         "./node_modules/@types",
         "./src/types"
       ]
     }
   }
   ```

## 注意事項

自訂型別宣告檔案只會影響 TypeScript 的型別檢查，不會改變運行時的行為。如果您發現型別宣告與實際庫的 API 不符，請更新型別宣告檔案。 