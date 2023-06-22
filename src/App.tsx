import React from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ManageTicket from './pages/ManageTicket/ManageTicket';
import TicketControl from './pages/TicketControl/TicketControl';
import ServicePackage from './pages/Settings/ServicePackage/ServicePackage';

function App() {
  return (
    <ConfigProvider 
      theme={{
        token: {
          fontFamily: 'Montserrat Thin',
          colorPrimary: '#FFB800',
        },
        components: {
          Button: {
            colorBgContainer: '#ff993c'
          },
          Menu: {
            itemColor: '#1E0D03',
            itemActiveBg: '#FFB800',
            fontSize: 18,
            lineHeight: 56,
            margin: 0,
            colorBgBase: '#F9F6F4',
          },
          Popover: {
            colorBgElevated: '#FFD2A8'
          },
        },
      }}>
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
