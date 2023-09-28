import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReservationForm from './components/ReservationForm.jsx'
import Taskbar from './components/Taskbar.jsx'
import ReservationPage from './pages/ReservationPage'
import ReservationListPage from './pages/ReservationListPage.jsx'

import { Box } from '@mui/material'

import './index.css'

export default function App() {
    return (
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route index element={<ReservationListPage />} />
                    <Route path="/list" element={<ReservationListPage />} />
                    <Route path="/reserve" element={<ReservationPage />} />
                    <Route path="*" element={<ReservationListPage />} />
                </Routes>
            </BrowserRouter>
        </Box>
    )
}