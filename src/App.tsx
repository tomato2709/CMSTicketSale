import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ManageTicket from './pages/ManageTicket/ManageTicket';
import TicketControl from './pages/TicketControl/TicketControl';
import ServicePackage from './pages/Settings/ServicePackage/ServicePackage';

function App() {
  return (
    <ConfigProvider theme={{token: {fontFamily: 'Montserrat Thin',},}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="home" element={<Home />} />
            <Route path="manage-ticket" element={<ManageTicket />} />
            <Route path="ticket-control" element={<TicketControl />} />
            <Route path="settings/service-pack" element={<ServicePackage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
