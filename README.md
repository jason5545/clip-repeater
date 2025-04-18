# 影片片段重複器

**專案簡介**  
影片片段重複播放工具，可儲存並重複播放指定時間段的影片。

**功能**  
- 設定影片網址、曲名與時間段（格式：00:00-01:30）。  
- 列表檢視已儲存片段，並支援播放、刪除功能。  
- 以 localStorage 儲存片段清單，關閉後仍可保留。

**安裝與使用**  
1. 將本專案複製至本機：  
   ```bash
   git clone <專案網址>
   ```
2. 進入專案目錄：  
   ```bash
   cd clip-repeater
   ```
3. 啟動簡易 HTTP 伺服器（選擇任一）：  
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js 內建 http-server 模組
   npx http-server . -p 8000
   ```
4. 開啟瀏覽器並造訪：  
   ```text
   http://localhost:8000
   ```
5. 在介面輸入影片網址、曲名、時間段後點擊「儲存」即可使用。

**專案結構**  
```
/                專案根目錄
├─ index.html    主程式檔案
└─ README.md     專案說明文件
```

**瀏覽器支援**  
- 支援 Chrome、Firefox、Safari、Edge 等現代瀏覽器。

**授權**  
本專案採 MIT 授權。

**貢獻**  
歡迎提出議題 (Issue) 與拉取請求 (Pull Request)。 