import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css';
import Index from './app/routes/Index';
import SingleGateway from './app/routes/SingleGateway';
import CreateGateWayPage from './app/routes/CreateGatewayPage';
import Layout from './app/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/create" element={<CreateGateWayPage />} />
          <Route path="/:name" element={<SingleGateway />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
