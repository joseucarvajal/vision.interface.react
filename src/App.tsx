import React from 'react';
import './App.css';

import InterfacePage from "./pages/interface.page";
import { ReactQueryCacheProvider, useQueryCache } from 'react-query';

function App() {
  const queryCache = useQueryCache();
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <InterfacePage></InterfacePage>
    </ReactQueryCacheProvider>
  );
}

export default App;
