import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReservationPage from './pages/ReservationPage'
import ReservationList from './pages/ReservationListPage'
import UpdateReservation from './pages/EditReservationPage'

import { Box } from '@mui/material'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route index element={<ReservationList />} />
                    <Route path="/list" element={<ReservationList />} />
                    <Route path="/reserve" element={<ReservationPage />} />
                    <Route path="/update/:id" element={<UpdateReservation />} />
                    <Route path="*" element={<ReservationList />} />
                </Routes>
            </BrowserRouter>
        </Box>
    )
