import "./App.css";
import { TraidingPage } from "./app/pages/traiding-page/traiding-page";
// import {fetchTradings} from "./app/features/tradings/slices/tradings.slice"
import {fetchParticipants} from "./app/features/participants/slices/participants.slice"
// import {store} from "./app/store/index"


function App() {
// из документации
// store.dispatch(fetchTradings())

  return (
    <div className="App">
      <TraidingPage />
    </div>
  );
}

export default App;
