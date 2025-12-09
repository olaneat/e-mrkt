import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neatstorez.app',
  appName: 'neat-storez',
  webDir: 'dist',
  // bundledWebRuntime: false,
  server: {
  androidScheme: 'https'
}
};

export default config;
