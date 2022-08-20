function Square(props) {
  if (props.highlight)
  return /*#__PURE__*/(
    React.createElement("button", { className: "highlight-square", onClick: props.onClick },
    props.value));


  return /*#__PURE__*/(
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));


}

class Board extends React.Component {
  renderSquare(num) {
    const winner = this.props.winner;
    for (let i = 0; i < winner.length; i++)
    if (winner[i] == num)
    return /*#__PURE__*/(
      React.createElement(Square, {
        key: num,
        value: this.props.squares[num],
        onClick: () => this.props.onClick(num),
        highlight: true }));


    return /*#__PURE__*/(
      React.createElement(Square, {
        key: num,
        value: this.props.squares[num],
        onClick: () => this.props.onClick(num),
        highlight: false }));


  }

  renderRow(row, col) {
    let square = [];
    for (let i = 0; i < col; i++)
    square.push(this.renderSquare(col * row + i));
    return /*#__PURE__*/(
      React.createElement("div", { className: "board-row", key: row }, square));

  }

  renderBoard(row, col) {
    let square = [];
    for (let i = 0; i < row; i++)
    square.push(this.renderRow(i, col));
    return /*#__PURE__*/(
      React.createElement("div", null, square));

  }

  render() {
    return this.renderBoard(3, 3);
  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
      {
        squares: Array(9).fill(null),
        gridNumber: -1 }],


      stepNumber: 0,
      xIsNext: true,
      historyOrder: true };

  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
      {
        squares: squares,
        gridNumber: i }]),


      stepNumber: history.length,
      xIsNext: !this.state.xIsNext });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }

  setUpdown() {
    this.setState({
      historyOrder: !this.state.historyOrder });

  }

  getUpdown() {
    const order = this.state.historyOrder ? 'descending' : 'ascending';
    return /*#__PURE__*/(
      React.createElement("button", { onClick: () => this.setUpdown() }, 'Change history to ' + order));

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = calculateDraw(current.squares);

    let moves;
    if (!this.state.historyOrder) {
      const reverse = structuredClone(history).reverse();
      moves = reverse.map((step, move) => {
        const desc = move !== reverse.length - 1 ?
        'Go to move #' + (reverse.length - move - 1) + ', Last step (' + history[reverse.length - move - 1].gridNumber % 3 + ', ' + parseInt(history[reverse.length - move - 1].gridNumber / 3) + ')' :
        'Go to game start';
        if (reverse.length - move - 1 === this.state.stepNumber)
        return /*#__PURE__*/(
          React.createElement("li", { key: reverse.length - move - 1 }, /*#__PURE__*/
          React.createElement("button", { onClick: () => this.jumpTo(reverse.length - move - 1) }, /*#__PURE__*/React.createElement("strong", null, desc))));else


        return /*#__PURE__*/(
          React.createElement("li", { key: reverse.length - move - 1 }, /*#__PURE__*/
          React.createElement("button", { onClick: () => this.jumpTo(reverse.length - move - 1) }, desc)));


      });
    } else
    moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move + ', Last step (' + history[move].gridNumber % 3 + ', ' + parseInt(history[move].gridNumber / 3) + ')' :
      'Go to game start';
      if (move === this.state.stepNumber)
      return /*#__PURE__*/(
        React.createElement("li", { key: move }, /*#__PURE__*/
        React.createElement("button", { onClick: () => this.jumpTo(move) }, /*#__PURE__*/React.createElement("strong", null, desc))));else


      return /*#__PURE__*/(
        React.createElement("li", { key: move }, /*#__PURE__*/
        React.createElement("button", { onClick: () => this.jumpTo(move) }, desc)));


    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (draw) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, {
        squares: current.squares,
        onClick: i => this.handleClick(i),
        winner: getWinner(current.squares) })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("div", null, this.getUpdown()), /*#__PURE__*/
      React.createElement("ol", null, moves))));



  }}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(Game, null));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return [-1, -1, -1];
}

function calculateDraw(squares) {
  for (let i = 0; i < squares.length; i++)
  if (!squares[i])
  return null;
  return true;
}