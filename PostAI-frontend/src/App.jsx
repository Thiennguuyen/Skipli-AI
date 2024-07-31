import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Layout = route.isShowSidebar ? DefaultComponent : React.Fragment
                        return (
                            <Route key={index} path={route.path} element={
                                <Layout>
                                    <route.page/>
                                </Layout>
                            } />                       
                        )
                    })}
                </Routes>
            </Router>
        </>
    )
}

export default App
