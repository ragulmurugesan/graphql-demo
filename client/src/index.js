import 'bulma/css/bulma.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/queries";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


loadDevMessages();
loadErrorMessages();

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);


