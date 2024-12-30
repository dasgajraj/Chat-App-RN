import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

