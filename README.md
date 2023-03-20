# Task-Manager
![image](https://i.imgur.com/AYHFWJM.jpg)
> 此專案為 Dcard [2023 Frontend Intern Homework](https://drive.google.com/file/d/1ZlwuUafAQUKBEA_ZK6ShM5F4xLTkV_4X/view)，是一個串接 Github API，讓使用者能「新增」、「更新」、「搜尋」Task，並能夠更新 Task 狀態的專案管理工具。

- [線上觀看連結](https://linyawun.github.io/Task-Manager/)

## 功能 
> 需使用自己的 Github 帳號登入

- [x] 登入(Github OAuth)
- [x] 登出
- [x] 顯示 task 列表 (即 issue 列表)
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
請在終端機輸入 cp .env.example .env 來複製 .env.example 檔案，並依據 .env 內容調整相關欄位。
### 
## 聯絡作者
你可以透過以下方式與我聯絡
- email: linyawun031@gmail.com

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
