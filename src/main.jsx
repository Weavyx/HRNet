/**
 * @fileoverview Point d'entrée principal de l'application React.
 * Configure le store Redux, le routeur et monte l'application sur le DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

/**
 * Initialise et monte l'application React avec tous les providers nécessaires.
 * Configuration : StrictMode → Redux Provider → Router Provider
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
