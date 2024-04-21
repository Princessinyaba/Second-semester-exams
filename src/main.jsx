import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import Repository from './App.jsx';
import ErrorBoundary from './pages/ErrorBound.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Suspense fallback={<div>loading</div>}>
      <ErrorBoundary>
    <Repository/>
    </ErrorBoundary>
    </Suspense>
    </Router>
  </React.StrictMode>,
)
