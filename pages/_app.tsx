import type { AppProps } from 'next/app';
import { wrapper } from '@Redux/store';
import { parseCookies } from 'nookies';
import { UserApi } from '@Api/user';
import { setUserData } from '@Redux/slices/user';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const { token } = parseCookies(ctx);

        const userData = await UserApi.getMe(token);

        store.dispatch(setUserData({ jwt: token, user: userData }));
      } catch (err) {
        console.warn(err);
      }

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

export default wrapper.withRedux(App);
