import { ThemeType } from 'styles/themes';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
