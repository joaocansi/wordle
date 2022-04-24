import Board from "../components/Board";
import Header from "../components/Header";

import "../styles/styles.scss";

function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
}

export default Home;
