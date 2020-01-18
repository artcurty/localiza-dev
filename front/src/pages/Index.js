import React, { useEffect, useState } from "react";
import api from "../services/api";
import DevItem from "../components/DevItem";
import DevForm from "../components/DevForm";

import "../global.css";
import "./styles.css";
import "../Sidebar.css";
import "../Main.css";

function HomePage({ devs, deleteDev, editDev }) {
  return (
    <div id="app">
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

export default HomePage;
