import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeBody from "./components/HomeBody";
import AdminLogin from "./components/AdminLogin";
import VoteParticipants from "./components/VoteParticipants";
import AdminPage from "./components/AdminPage";
import AdminParticipants from "./components/AdminParticipants";
import AdminVoters from "./components/AdminVoters";
import AdminVotes from "./components/AdminVotes";
import { UserContext } from "./components/context/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {
  const { userValue, loginValue } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = loginValue;

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/admin/decode",
      method: "post",
      withCredentials: true,
    });
    if (response.data === true) {
      setIsLoggedIn(true);
    }
  };
  return (
    <Router>
      <div className="App">
        <Header />
      </div>

      <Switch>
        <Route path="/" exact>
          <AdminLogin />
        </Route>
        <Route path="/vote-participants/:token">
          <VoteParticipants />
        </Route>
        {/* <Route path="/admin-page" exact>
          <AdminPage />
        </Route> */}
        <Route path="/admin-page/participants">
          <AdminParticipants />
        </Route>
        <Route path="/admin-page/voters">
          <AdminVoters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
