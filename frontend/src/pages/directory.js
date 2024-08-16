import Layout from "../components/layout";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const DirAccessEndpoint = "http://localhost:8000/api/dirAccess/";
  const fileAccessEndpoint = "http://localhost:8000/api/fileAccess/";

  const [dirStack, setDirStack] = useState(["college/"]);
  const [dirContents, setDirContents] = useState(null);

  const logout = useCallback( async () => {
    try {
      await onLogout();
      dispatch(unAuthenicateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const currURL = dirStack
      .map((dir) => encodeURIComponent(dir.replace(/\//g, "")))
      .join("/");
    axios
      .get(DirAccessEndpoint + currURL)
      .then((response) => {
        setDirContents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error.response.data.error);
        logout();
      });
  }, [dirStack, logout]);

  const handleClick = (item) => {
    if (item.includes(".")) {
      const fileURL =
        fileAccessEndpoint +
        dirStack
          .map((dir) => encodeURIComponent(dir.replace(/\//g, "")))
          .join("/") +
        "/" +
        encodeURIComponent(item);
      window.open(fileURL, "_blank");
    } else {
      setDirStack([...dirStack, item + "/"]);
    }
  };

  const handleBackClick = () => {
    if (dirStack.length > 1) {
      setDirStack(dirStack.slice(0, -1));
    }
  };

  return loading ? (
    <Layout>
      <h1>loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <div class="form-control">
          {dirContents &&
            dirContents.map((item, index) => (
              <div key={index} onClick={() => handleClick(item)}>
                {item}
              </div>
            ))}
        </div>
        <div>
          <button
            onClick={handleBackClick}
            className="btn btn-primary"
            style={{ margin: "10px 10px 0 0" }}
          >
            Back
          </button>
          <button
            onClick={() => logout()}
            className="btn btn-primary"
            style={{ margin: "10px 10px 0 0" }}
          >
            Logout
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
