import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:userId/places" component={UserPlaces} exact />
          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/:placeId" component={UpdatePlace} />
          <Redirect to="/" exact />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
