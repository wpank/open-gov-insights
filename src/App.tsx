import React from 'react'
import './App.css'
import { OpenGovChart } from './components/Chart'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import VoteList from './components/VoteList'
import ReferendumItemsList from './components/ReferendaList'
import VoterItemsList from './components/VoterList'
import VoterDetail from './components/VoterDetail'
import DelegateListPage from './pages/DelegateListPage'
import DelegateDetailsPage from './pages/DelegateDetailsPage'

function App() {
  return (
    <div className="All">
      <ThemeProvider theme={theme}>
        <Nav />
        <div className="App">
          <Routes>
            <Route>
              <Route path="/" element={<OpenGovChart />} />
              <Route path="/stats" element={<OpenGovChart />} />
              <Route path="/referenda" element={<ReferendumItemsList />} />
              <Route
                path="/referenda/:referendumIndex"
                element={<VoteList />}
              />
              <Route path="/voters" element={<VoterItemsList />} />
              <Route path="/voter/:address" element={<VoterDetail />} />
              <Route path="/delegates" element={<DelegateListPage />} />
              <Route
                path="/delegates/:address"
                element={<DelegateDetailsPage />}
              />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
