import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neatstorez.app',
  appName: 'neat-storez',
  webDir: 'dist',
  // bundledWebRuntime: false,
  
  server: {
  androidScheme: 'https'
},
android: {
    adjustMarginsForEdgeToEdge: 'force'  // or 'auto' — try both if needed
},
plugins: {
  EdgeToEdge: {
    backgroundColor: '#000000'  // ← black/dark to match your header
    // statusBarColor: '#000000',     // optional extras
    // navigationBarColor: '#000000'
  }
  }
}
export default config;
