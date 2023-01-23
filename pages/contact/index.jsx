import React from "react";

///Object

const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

function MyButton() {
  return <button>I'm a button.</button>;
}

//next ex
function MineButton() {
  function handleClick() {
    alert('You clicked me!');
  }
}

export default function MyApp() {
  return (
    <>
    <div>
      <h1> Hi my name is What? </h1>
      <MyButton />
    </div>

    <div>
        <h1>{user.name}</h1>

        <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
            width: user.imageSize,
            height: user.imageSize
        }}
      />
    </div>

    <div>
    <button onClick={handleClick}>
      New Click me
    </button>
    </div>
    </>
  );
}
