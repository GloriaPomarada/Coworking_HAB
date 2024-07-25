import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/Profile">
        <button>Ir al Perfil</button>
      </Link>
    </>
  );
}

export default Home;
