import { AuthProvider } from './services/login/AuthProvider'
import LoginPage from "./components/Login"


function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage/>}
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
