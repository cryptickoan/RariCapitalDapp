// Rari //
import { RariContextProvider } from './context/RariProvider';


// Style //
import './index.css'

// Dependencies //
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Components //
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },})

ReactDOM.render(
  
    <RariContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
        <ReactQueryDevtools initialIsOpen position="top-left"/>
      </QueryClientProvider>
    </RariContextProvider>,
  document.getElementById('root')
);