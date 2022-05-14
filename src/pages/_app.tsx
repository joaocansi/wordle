import { WordleProvider } from '../contexts/WordleContext';

function MyApp({ Component, pageProps }) {
  return (
    <WordleProvider>
      <Component {...pageProps} />
    </WordleProvider>
  );
}

export default MyApp;
