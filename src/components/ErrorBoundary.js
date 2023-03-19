import React, { Component } from 'react';
import ErrorScreen from './ErrorScreen';

export default class ErrorBoundary extends Component {
  //繼承 React.Component 來建立處理錯誤元件
  state = { error: null }; //初始狀態中的錯誤儲存物件

  static getDerivedStateFromError(error) {
    //繼承 geDerivedStateFromError
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error && !fallback) return <ErrorScreen error={error} />; //不正常時(error為true時)且客製處理(fallback)為false時，採用預設錯誤處理
    if (error) return <fallback error={error} />; //不正常時(error為true時)，採用客製錯誤處理(fallback)

    return children; //如果沒error(正常時)，單純回傳原本的子元件
  }
}
