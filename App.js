import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  function handleSignedIn(user) {
    // Navigate to the main app here.
    console.log('Signed in as', user.username);
  }

  return (
    <>
      <StatusBar style="dark" />
      <LoginScreen onSignedIn={handleSignedIn} />
    </>
  );
}
