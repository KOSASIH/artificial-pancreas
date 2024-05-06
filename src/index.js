// Import dependencies
import React, { useState, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// Import components
import AppHeader from './components/AppHeader';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import GlucoseChart from './components/GlucoseChart';
import InsulinCalculator from './components/InsulinCalculator';
import NotFound from './components/NotFound';

// Create a Material-UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

// Create an error link for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create an authentication link for Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: from([errorLink, authLink, new HttpLink({ uri: 'https://api.artificial-pancreas.com/graphql' })]),
  cache: new InMemoryCache(),
});

function App() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [insulinData, setInsulinData] = useState({});

  useEffect(() => {
    // Fetch glucose data from API
    client.query({
      query: gql`
        query GetGlucoseData {
          glucoseData {
            id
            timestamp
            value
          }
        }
      `,
    })
     .then(result => setGlucoseData(result.data.glucoseData))
     .catch(error => console.error(error));

    // Fetch insulin data from API
    client.query({
      query: gql`
        query GetInsulinData {
          insulinData {
            id
            timestamp
            dose
          }
        }
      `,
    })
     .then(result => setInsulinData(result.data.insulinData))
     .catch(error => console.error(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppHeader />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route path="/glucose-chart" component={GlucoseChart} />
            <Route path="/insulin-calculator" component={InsulinCalculator} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
