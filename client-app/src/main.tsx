// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
import { store, StoreContext } from './app/stores/store.ts';
import { RouterProvider } from 'react-router-dom';
import { Router } from './app/router/Routes.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode> just add a closing tag
    <StoreContext.Provider value={store}>
      <RouterProvider router={Router} />
    </StoreContext.Provider>
)
