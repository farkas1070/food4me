import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from './Navigators/StackNavigator.js';
import { DataProvider } from "./Context/GlobalContext.js"
import { StatusBar } from 'react-native';
function App() {
  StatusBar.setBarStyle('light-content')
  


  return (
    <DataProvider>
      <PaperProvider>
        <StackNavigator/>
      </PaperProvider>
    </DataProvider>
  );
}

export default App;