import LoginScreen from '../../../ui/auth/login/login';
import SplashView from '../../../ui/auth/login/splash/splash';
import RegisterScreen from '../../../ui/auth/register/register';
import Tests from '../../../ui/test/tests';

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
