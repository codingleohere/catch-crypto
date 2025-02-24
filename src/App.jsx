import Navbar from './components/Navbar/Navbar'
import HeroMain from './components/HeroMain/HeroMain'
import CoinsTable from './components/CoinsTable/CoinsTable'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root';
import CoinsDetails from './components/CoinsDetails/CoinsDetails';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const router = createBrowserRouter([
    {
      element: <Navbar />,
      path: '/',
      children: [
        {
          path: "",
          element: <Root />,
        },
        {
          path: "/:id",
          element: <CoinsDetails />
        }
      ]
    },
  ])



  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}>
      </RouterProvider >
    </ThemeProvider>
  )
}

export default App
