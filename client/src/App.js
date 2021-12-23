import './App.css';
import Entrar from './components/entrar/Entrar';
import Cadastro from './components/cadastro/Cadastro'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path='/' component={Entrar} />
       <Route path='/cadastro' component={Cadastro} />
     </Switch>
   </Router>
  );
}
export default App;
