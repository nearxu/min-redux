import React from 'react';
import { Count } from './pages/count';
import { Middle } from './pages/applyMiddlerware';
import { Middleware } from './pages/middleware';
import { ThunkComponent } from './pages/thunk-async';

function App() {
  return (
    <div className="App">
      <Middleware />
      <ThunkComponent />
    </div>
  );
}

export default App;
