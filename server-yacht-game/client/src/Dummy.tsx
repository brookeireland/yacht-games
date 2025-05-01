import React from "react";
import { sendUsername, fetchUsername } from "./api";

export function Dummy() {
  return (
    <>
      <div>
        <Setter />
      </div>
      <div>
        <Getter />
      </div>
    </>
  );
}

function Setter() {
  const [value, setValue] = React.useState("");
  const handleClick = async () => {
    await sendUsername(value);
  };
  return (
    <>
      <button onClick={handleClick}>Set Username</button>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
    </>
  );
}

function Getter() {
  const [username, setUsername] = React.useState("");
  const handleClick = async () => {
    const val = await fetchUsername();
    setUsername(val);
  };

  return (
    <>
      <button onClick={handleClick}>Get Username</button>
      <div>Username: </div>
      <div>{username} </div>
    </>
  );
}
