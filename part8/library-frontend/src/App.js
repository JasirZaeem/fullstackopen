import { Main } from "./components/Main";
import { Nav } from "./components/Nav";
import { useState } from "react";
import { PAGES } from "./constants";

const App = () => {
  const [page, setPage] = useState(PAGES.authors);

  return (
    <div className="App">
      <Nav setPage={setPage} />
      <Main page={page} />
    </div>
  );
};

export default App;
