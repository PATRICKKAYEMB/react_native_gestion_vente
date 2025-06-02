import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen.";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile.";
import VideoDetailsScreen from "../screens/VideoDetailsScreen";
import VideoDetailScreen from "../screens/VideoDetailsScreen";
import ChatAiScreen from "../screens/ChatAiScreen";
import {COLORS} from "../constant/COLORS";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Image} from "react-native";
import useAuth from "../config/AuthContext";



const Stack = createStackNavigator();

const AppNav = ({onReady}) => {

    const {login, logout, isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return (
            <NavigationContainer onReady={onReady}>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SignIn"}>
                    <Stack.Screen name={"SignIn"} component={SignInScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else if (isAuthenticated) {
        return (
            <NavigationContainer onReady={onReady}>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
                <Stack.Screen name={"Home"} component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={"Profil"} component={UserProfile} options={{headerShown: false}}/>
                    <Stack.Screen name={"VideoDetail"} component={VideoDetailScreen} options={{headerShown: false}}/>
                    <Stack.Screen
                        name="ChatAi"
                        component={ChatAiScreen}
                        options={{
                            title: 'Discussion AI',
                            headerTitleAlign: 'center', // 👈 centre le titre dans le header
                            headerTitleStyle: {
                                fontWeight: 'bold', // (optionnel)
                            },
                            headerStyle: {
                                backgroundColor: 'white',
                            },
                          },
                          headerLeft: (props) => <Image style={{height: 35, width: 35, marginLeft: 10}}
                                                        source={require('../../assets/images/profil.png')}/>,
                          headerRight: (props) => <MaterialCommunityIcons style={{marginRight: 10}} name={"history"}
                                                                          size={30}/>
                      }}
                  />
              </Stack.Navigator>
          </NavigationContainer>
      )
  }
}
export default AppNav;
