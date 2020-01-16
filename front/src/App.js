import React, { useEffect, useState } from "react";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
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
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              refresh={deleteDev}
              editdev={editDev}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
