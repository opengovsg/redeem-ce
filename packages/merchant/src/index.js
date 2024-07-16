import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from 'app/App'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
