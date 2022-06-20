import 'reactjs-popup/dist/index.css';
import ModalRoot from 'components/modals/ModalRoot';
import { MainProvider } from 'contexts/MainProvider';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <Component {...pageProps} />
      <ModalRoot />
      <Toaster
        toastOptions={{
          style: {
            maxWidth: '500px',
            backgroundColor: 'var(--color-toast-background)',
            color: 'var(--color-texts)',
            fontSize: '2em',
          },
        }}
        position="top-center"
      />
    </MainProvider>
  );
}

export default MyApp;
