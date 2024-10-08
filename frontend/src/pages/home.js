import Layout from "../components/layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <Layout>
      <h1>Welcome to Alan Tuecci's Notes App!</h1>

      <br></br>

      <h2>
        This application contains a complete collection of Alan Tuecci's notes,
        study guides, and course materials.
      </h2>

      <br></br>

      

      {authState.isAuth ? (
        <div>
          <h2>Welcome back! You have successfully signed in and can now access the notes!</h2>
          <NavLink to="/directory">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Directory
            </button>
          </NavLink>
        </div>
      ) : (
        <div>
          <h2>Please sign in or create an account to get started.</h2>
          <NavLink to="/login">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Register
            </button>
          </NavLink>
        </div>
      )}
    </Layout>
  );
};

export default Home;
