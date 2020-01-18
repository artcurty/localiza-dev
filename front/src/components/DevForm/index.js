import React, { useEffect, useState } from "react";
import "./styles.css";

function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithub_username] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
      // senha,
      // confirma_senha
    });

    setGithub_username("");
    setTechs("");
  }

  return (
    <div className="new-user-box">
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setGithub_username(e.target.value)}
          ></input>
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          ></input>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            ></input>
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              required
              // value={senha}
              // onChange={e => setSenha(e.target.value)}
            ></input>
          </div>

          <div className="input-block">
            <label htmlFor="confirma_senha">Confirme a senha</label>
            <input
              type="password"
              name="confirma_senha"
              id="confirma_senha"
              required
              // value={confirma_senha}
              // onChange={e => setconfirma_senha(e.target.value)}
            ></input>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit}>
          Salvar
        </button>
      </form>
    </div>
  );
}

export default DevForm;
