import { Route, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage"
import NotFound from "./components/pages/NotFound"
import Login from "./components/pages/Login"
import RegisterPage from "./components/pages/RegisterPage"
import { ROUTE } from "./types/RouteLinks"
import CreateGame from "./components/pages/CreateGame"
import UserProvider from "./context/UserContextId"
import Dashboard from "./components/pages/Dashboard"
import DialogVideoGameProvider from "./context/VideoGameCardDialogContext"
import ReviewDialogProvider from "./context/ReviewDialogContext"
import EditVideoGame from "./components/pages/EditVideoGame"

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path={ROUTE.Home} element={
          <DialogVideoGameProvider>
            <ReviewDialogProvider>
              <HomePage />
            </ReviewDialogProvider>
          </DialogVideoGameProvider>
        } />
        <Route path={ROUTE.Login} element={
          <Login />
        } />
        <Route path={ROUTE.Register} element={
          <RegisterPage />
        } />
        <Route path={ROUTE.CreateGame} element={
          <CreateGame />
        } />
        <Route path={ROUTE.Dashboard} element={
          <Dashboard />
        } />
        <Route path={ROUTE.EditGame} element={
          <EditVideoGame />
        } />
        <Route path={ROUTE.NotFound} element={
          <NotFound />
        } />
      </Routes>
    </UserProvider>
  )
}

export default App
