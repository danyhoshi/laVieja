import "./App.css";
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function App() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <div className="board-row">
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
      </div>
      <div className="board-row">
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
      </div>
      <div className="board-row">
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
        <Square value="" onSquareClick={handleClick} />
      </div>
    </>
  );
}

export default App;
