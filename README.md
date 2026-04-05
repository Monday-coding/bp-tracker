# 血壓記錄 App

一個專為長者設計的血壓記錄應用程式，使用 React Native Expo 構建，支持跨平台（iOS/Android/Web）。

## 功能特點

✅ **大字體界面** - 專為長者設計，字體清晰，操作簡單
✅ **血壓記錄** - 記錄收縮壓、舒張壓和脈搏
✅ **歷史查詢** - 查看所有歷史記錄
✅ **數據圖表** - 顯示血壓趨勢圖表
✅ **本地存儲** - 數據安全存儲在設備上
✅ **智能分類** - 自動判斷血壓是否正常

## 安裝與運行

### 前置要求

- Node.js (v18 或更高版本)
- Expo CLI
- 對於 iOS: macOS 和 Xcode
- 對於 Android: Android Studio

### 安裝步驟

1. 安裝依賴：
```bash
cd bp-tracker
npm install
```

2. 啟動開發服務器：
```bash
npm start
```

3. 根據你的設備選擇：

**iOS 模擬器：**
```bash
npm run ios
```

**Android 模擬器：**
```bash
npm run android
```

**網頁瀏覽器：**
```bash
npm run web
```

**Expo Go App（手機）：**
- 下載 Expo Go 應用（iOS App Store / Google Play）
- 掃描終端顯示的 QR 碼

## 專案結構

```
bp-tracker/
├── App.js                          # 應用程式入口
├── src/
│   ├── components/                  # 可復用組件
│   │   ├── BPCard.js               # 血壓卡片
│   │   ├── BPInput.js              # 血壓輸入組件
│   │   └── LargeButton.js          # 大按鈕組件
│   ├── screens/                     # 頁面組件
│   │   ├── HomeScreen.js           # 首頁
│   │   ├── RecordScreen.js         # 記錄頁面
│   │   ├── HistoryScreen.js        # 歷史記錄
│   │   └── ChartScreen.js          # 圖表頁面
│   ├── storage/                     # 數據存儲
│   │   └── bpStorage.js            # 血壓數據存儲
│   └── utils/                       # 工具函數
│       └── bpCalculator.js         # 血壓計算工具
└── package.json
```

## 使用說明

### 首頁
- 顯示最近 5 條血壓記錄
- 顯示平均血壓數據
- 快速訪問記錄和歷史功能

### 記錄血壓
- 輸入收縮壓（高壓）和舒張壓（低壓）
- 可選擇輸入脈搏
- 支持選擇日期和時間
- 點擊 + 或 - 按鈕快速調整數值

### 歷史記錄
- 查看所有血壓記錄
- 長按記錄卡片可刪除
- 支持匯出記錄為文本格式

### 血壓趨勢
- 顯示血壓趨勢圖表
- 可選擇 7 天、14 天或 30 天範圍
- 顯示統計數據（最高、最低、平均值）

## 血壓分類標準

- **正常**: < 120/80 mmHg
- **正常偏高**: 120-139/80-89 mmHg
- **高血壓**: ≥ 140/90 mmHg
- **低血壓**: < 90/60 mmHg

## 技術棧

- **框架**: React Native + Expo
- **導航**: React Navigation
- **存儲**: AsyncStorage
- **圖表**: React Native Chart Kit
- **日期處理**: date-fns

## 開發

### 依賴項
- React Native
- Expo
- React Navigation
- AsyncStorage
- React Native Chart Kit
- date-fns

### 常用命令

```bash
# 啟動開發服務器
npm start

# 清除緩存
expo start -c

# 構建生產版本
eas build --platform ios
eas build --platform android
```

## 許可證

MIT

## 貢獻

歡迎提交問題和拉取請求！
