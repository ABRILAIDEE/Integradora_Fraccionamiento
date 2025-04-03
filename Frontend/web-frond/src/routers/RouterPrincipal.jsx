import React from "react";
import { Routes, Route, NavLink, BrowserRouter, Navigate } from "react-router-dom";
import LoginScreen from '../components/LoginScreen';
import ValidarLogin from '../components/ValidarLogin';
import HomeScreen from '../components/HomeScreen';
import CrearVisita from '../components/CrearVisita';
import TablaScreen from '../components/TablaScreen';
import EditarPerfil from '../components/EditarPerfil';
import PerfilScreen from '../components/PerfilScreen';
import QRScreen from '../components/QRScreen';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/validar" element={<ValidarLogin />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/crear-visita" element={<CrearVisita />} />
        <Route path="/tabla" element={<TablaScreen />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path="/qr" element={<QRScreen />} />
        <Route path="*" element={<h1>Error 404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
