import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'spotifyApp',
  webDir: 'www',
  server: {
    androidScheme: 'http://localhost:8100'
  }
};

export default config;
