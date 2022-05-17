import { WordleProvider } from '../contexts/WordleContext';
import 'reactjs-popup/dist/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <WordleProvider>
      <Component {...pageProps} />
    </WordleProvider>
  );
}

export default MyApp;
