import React, { useEffect, useState } from "react";
import DevForm from "./components/DevForm";
import logo from "./logo-localiza.png";
import HomePage from "./pages/Index";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(true);
  const [devs, setDevs] = useState([]);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  async function deleteDev(data) {
    const response = await api.delete("/devs", data);
    const refreshList =
      response.data.deletedCount === 1
        ? devs.filter(
            refresh => refresh.github_username !== data.params.github_username
          )
        : null;
    setDevs([...refreshList]);
  }

  async function editDev(data) {
    const response = await api.put("/devs", data);
    if (response.data.nModified === 1) {
      const editList = await api.get("/devs");
      setDevs([...editList.data]);
    }
  }

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  return (
    <>
      {visible ? (
        <div className="select-option">
          <img src={logo} alt="" />
          <div className="group-button">
            <button
              type="submit"
              value="login"
              onClick={e => {
                setSelected(e.target.value);
                setVisible(false);
              }}
            >
              Login
            </button>
            <button
              type="submit"
              value="cadastro"
              onClick={e => {
                setSelected(e.target.value);
                setVisible(false);
              }}
            >
              Cadastro
            </button>
          </div>
        </div>
      ) : (
        <div className="back-selected">
          <button
            type="submit"
            onClick={() => {
              setVisible(true);
              setSelected();
            }}
          >
            Voltar
          </button>
        </div>
      )}

      {selected === "login" ? (
        <HomePage devs={devs} deleteDev={deleteDev} editDev={editDev} />
      ) : selected === "cadastro" ? (
        <DevForm onSubmit={handleAddDev} />
      ) : null}
    </>
  );
}

export default App;
