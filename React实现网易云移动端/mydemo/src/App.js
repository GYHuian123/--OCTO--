import './App.css';
//引入路由插件
import { Switch, Route, Redirect } from 'react-router-dom'

import { lazy, Suspense } from 'react'
//引入一级路由组件
// import Index from './pages/index'
// import Playlist from './pages/playlist'
// import Play from './pages/play'
//应用路由的懒加载
const Index = lazy(() => import('./pages/index'))
const Playlist = lazy(() => import('./pages/playlist'))
const Play = lazy(() => import('./pages/play'))

function App() {
  return (
    <div>
      {/* 路由出口 */}
      <Switch>
        <Suspense fallback={<div>无所谓</div>}>
          <Route path='/index' component={Index}></Route>
          <Route path='/playlist/:id' component={Playlist}></Route>
          <Route path='/play' component={Play}></Route>
          {/* 重定向 */}
          <Redirect to='/index'></Redirect>
        </Suspense>

      </Switch>
    </div>
  );
}

export default App;
