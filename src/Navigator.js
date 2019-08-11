import Main from './screens/Main'
import Login from './screens/Login'
import AddLactente from './screens/AddLactente'
import ViewLactente from './screens/ViewLactente'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'

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
  AddLactente: {screen: AddLactente,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  ViewLactente: {screen: ViewLactente,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  SignUp: {screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  Profile: {screen: Profile,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  },
  
});

const App = createAppContainer(MainNavigator);

export default App;

