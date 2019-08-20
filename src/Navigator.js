import Main from './screens/Main'
import Login from './screens/Login'
import AdicionarLactente from './screens/AdicionarLactente'
import VisualizarLactente from './screens/VisualizarLactente'
import Cadastrar from './screens/Cadastrar'
import Perfil from './screens/Perfil'
import GooglePlacesInput from './screens/GooglePlaces'

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createBottomTabNavigator({
  Login: {screen: Login,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })},
    Main: {screen: Main,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: false
      })
    },
    AdicionarLactente: {screen: AdicionarLactente,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  VisualizarLactente: {screen: VisualizarLactente,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  Cadastrar: {screen: Cadastrar,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  Perfil: {screen: Perfil,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  GooglePlaces: {screen: GooglePlacesInput,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })},
  
});

const App = createAppContainer(MainNavigator);

export default App;

