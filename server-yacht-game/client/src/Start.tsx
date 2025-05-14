import React from "react";
import { apiLogin } from "./api";

export function Start({
  onSetUsername,
}: {
  onSetUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, setValue] = React.useState("");
  const handleClick = async () => {
    await apiLogin(value);
    onSetUsername(value);
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
