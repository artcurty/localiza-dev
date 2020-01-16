import React, { useState, useEffect } from "react";
import "./styles.css";

function DevItem({ dev, refresh, editdev }) {
  const [edit, setEdit] = useState(false);
  const [newTchs, setNewTechs] = useState("");

  async function removeUser(event) {
    event.preventDefault();
    const remove = window.confirm("Deseja mesmo remover esse dev?");
    if (remove) {
      refresh({
        params: { github_username: dev.github_username }
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (newTchs !== "") {
      await editdev({
        github_username: dev.github_username,
        techs: newTchs
      });
    }
    setEdit(!edit);
  }

  return (
    <li className="dev-item">
      <div className="user-options">
        <button onClick={removeUser}>Deletar</button>
        <button onClick={() => setEdit(!edit)}>Editar</button>
      </div>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
      {edit ? (
        <form action="">
          <div className="input-edit">
            <label htmlFor="">Editar tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              required
              value={newTchs}
              onChange={e => setNewTechs(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              Atualizar
            </button>
          </div>
        </form>
      ) : null}
    </li>
  );
}

export default DevItem;
