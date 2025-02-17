import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';  // Import routes

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
