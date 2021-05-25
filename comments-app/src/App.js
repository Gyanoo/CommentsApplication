import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CommentsView from "./components/CommentsView"
import AddComment from "./components/AddComment";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/create">
                    <AddComment />
                </Route>
                <Route path="/">
                  <CommentsView />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
