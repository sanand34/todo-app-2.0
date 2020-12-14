// Screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

//React Navigation Setup
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
});

const Login = createAppContainer(MainNavigator);

export default Login;
