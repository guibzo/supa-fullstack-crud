import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { ProductsList } from './products-list'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsList />
  </React.StrictMode>
)
