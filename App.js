import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from './Navigators/StackNavigator.js';
import { DataProvider } from "./Components/SetData.js"

function App() {

  


  return (
    <DataProvider>
      <PaperProvider>
        <StackNavigator/>
      </PaperProvider>
    </DataProvider>
  );
}

export default App;