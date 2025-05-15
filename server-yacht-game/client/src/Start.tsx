import React from "react";
import { apiLogin } from "./api";
import { User } from "./types";

export function Start({
  onSetUser: onSetUser,
}: {
  onSetUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}) {
  const [value, setValue] = React.useState("");
  const handleClick = async () => {
    const id = await apiLogin(value);
    onSetUser({ id, name: value });
  };
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={handleClick}>Log in</button>
    </>
  );
}
