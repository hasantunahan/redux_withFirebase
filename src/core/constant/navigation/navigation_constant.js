import LoginScreen from '../../../ui/auth/login/login';
import RegisterScreen from '../../../ui/auth/register/register';
import Tests from '../../../ui/test/tests';
import SplashView from '../../../ui/auth/splash/splash';

export var NavigationList = [
  {
    page: SplashView,
    name: 'Splash',
  },
  {
    page: LoginScreen,
    name: 'Login',
  },
  {
    page: RegisterScreen,
    name: 'Register',
  },
  {
    page: Tests,
    name: 'Test',
  },
];
