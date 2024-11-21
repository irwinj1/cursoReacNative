
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { initFirebase } from './src/utils';
import Toast from 'react-native-toast-message';


LogBox.ignoreAllLogs(); // ignore

export default function App() {
  
 // Fetch data from the API
  // const [data,setData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await httpClient.get('/ability');
  //       setData(response.data.results);
  //       console.log(response)
        
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}

