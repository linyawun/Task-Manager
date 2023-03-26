# Task-Manager
![image](https://i.imgur.com/AYHFWJM.jpg)
> 此專案為 Dcard [2023 Frontend Intern Homework](https://drive.google.com/file/d/1ZlwuUafAQUKBEA_ZK6ShM5F4xLTkV_4X/view)，是一個串接 Github API，讓使用者能「新增」、「更新」、「搜尋」Task，並能夠更新 Task 狀態的專案管理工具。

- [線上觀看連結](https://linyawun.github.io/Task-Manager/)

## 功能 
> 需使用自己的 Github 帳號登入

- [x] 登入(Github OAuth)
- [x] 登出
- [x] 顯示 task 列表 (即 issue 列表)
  - 此處顯示的是 assign 給使用者的所有 issue，issue 顯示的狀態為 issue 的 label，label 分別為：Open、In Progress、Done
- [x] task 篩選：依據狀態、建立時間、關鍵字內容篩選 
- [x] 顯示 task 詳情頁
- [x] 編輯 task，可編輯 title、body、state
- [x] 刪除 task (即 close issue)
- [x] 新增 task
- [x] 新增/編輯欄位的表單驗證

## 畫面
- Task List
![image](https://i.imgur.com/6Nkw8A2.jpg)

- Task Info
![image](https://i.imgur.com/4JsGPbI.jpg)

- Edit Task
![image](https://i.imgur.com/bkE6Iny.jpg)

## 安裝
以下將會引導你如何安裝此專案到你的電腦上。
> 請先安裝 [Node.js](https://nodejs.org/zh-tw/download)，Node.js 版本建議為：`18.12.0` 以上
### 取得專案
```bash
git clone https://github.com/linyawun/Task-Manager.git
```
### 移動到專案內
```bash
cd Task-Manager
```
### 安裝套件
```bash
npm install
```
### 環境變數設定
請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 .env 內容調整相關欄位。
### 運行專案
```bash
npm start
```
### 開啟專案
在瀏覽器網址列輸入以下即可看到畫面
```
http://localhost:8000/
```

## 環境變數說明
1. 請先申請 Github OAuth2 認證，到 [Register a new OAuth application](https://github.com/settings/applications/new) 註冊成為 OAuth 使用者
  - 必填欄位 “Application name”、“Authorization callback URL”、“Homepage URL”
    - Application name：Application 名字(隨意的字串，方便管理即可)
    - Authorization callback URL：請填入 `http://localhost:8000/`
    - Homepage URL：隨意的 URL
2. 取得 Client ID 和 Client Secret，填入 .env 內的環境變數
> 相關教學可參考：[申請 GitHub OAuth 權限紀錄](https://bestsamina.github.io/posts/2018-10-11-github-oauth/)
```bash
REACT_APP_CLIENTID = #github oauth app client ID
REACT_APP_CLIENTSECRET = #github oauth app client secret
...
```

## 資料夾說明
- public - 靜態檔案放置處
- src - JavsScript 檔案放置處
  - assets - scss 檔案與圖片放置處
  - components - React 元件放置處
  - pages - 頁面元件放置處
  - utilities - 共用函式放置處
  
## 專案技術
- Node.js v18.12.0
- React v18.2.0
- React-router-dom v6.9.0
- React-Hook-Form v7.43.5
- React-markdown-editor-lite v1.3.4
- Axios v1.3.4
- Bootstrap v5.2.3
- SweetAlert2 v11.7.3
- marked v4.2.12

## 聯絡作者
你可以透過以下方式與我聯絡
- email: linyawun031@gmail.com
