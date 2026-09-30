import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import './app.scss';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('[美团·周末去哪玩] 小程序启动成功');
  });
  return children;
}

export default App;
