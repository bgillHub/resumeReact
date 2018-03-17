import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import profile from './profile.jpg'
import './style.css'
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {


  renderSquare(i) {
    return <Square
    value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
     />;
  }

  render() {
  return (
    <div>
      <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  });
}
handleClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      squares: squares
    }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
  });
}

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div style ={{"padding": 1, "marginTop": 1}}>
      	<div className ="site-wrapper pager" style = {{"backgroundColor": "#233237", "padding": 1, "marginTop": 1}}>
      			<div className = "jumbotron" style = {{"backgroundColor": "#233237", "color":"white"}}>
      				<div className = "row">
      				<img className ="profile" src = {profile} />
      			</div>
      			<div className = "row">
      				<p style ={{"fontSize" : 26}}>Brian Gill</p>
      				<p style={{"padding": 10}}>Hello, and welcome to my personal in-progress career-building website. This will be a simple webpage updating my professional worth and personal interests. Currently, a lot of future work may be expected.</p>
      				<center><p style={{"fontSize":20}}>First: Why are you Here?</p></center>
      			</div>
      			<div className = "row" style={{"paddingTop": 5}}>
      				<button className = "btn btn-primary col-xs-2 col-xs-offset-3 round" data-toggle="modal" data-target="#bizModal" >Business</button>
      				<button className = "btn btn-warning col-xs-2 col-xs-offset-2 round"data-toggle="modal" data-target="#plezModal">Pleasure</button>
      			</div>
      			{/*}<div class = "row" style="marginTop: 15px">
      			*	<button class = "btn btn-success col-xs-2 col-xs-offset-5" data-toggle="modal" data-target="#blurbModal" >About Me</button>
      			*</div>*/}
      			</div>
      	</div>
      </div>
    );
  }
}

class modal1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  };
}
  render() {
    return (
      <div id="plezModal" className="modal fade popup" role="dialog">
        <div className="modal-dialog ">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Just My Interests</h4>
            </div>
            <div className="modal-body">
              <ul className = "list-group">
                <a href="plez.html#movies" className ="blank"><li className="list-group-item">Movies</li></a>
                <a href="plez.html#books" className ="blank" ><li className="list-group-item">Books</li></a>
                <a href="plez.html#games" className ="blank" ><li className="list-group-item">Games</li></a>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  };}
  render() {
    return (
      <div id="bizModal" className="modal fade" role="dialog">
      	<div className="modal-dialog">
      		{/* Modal content*/}
      		<div className="modal-content">
      			<div className="modal-header">
      				<button type="button" className="close" data-dismiss="modal">&times;</button>
      				<h4 className="modal-title">Business</h4>
      			</div>
      			<div className="modal-body">
      				<ul className = "list-group">
      					<a href="" className ="blank" data-toggle="modal" data-target="#resumePDF"><li class="list-group-item">Resume PDF</li></a>
      					<a href="biz.html#education" className ="blank" ><li className="list-group-item">Education</li></a>
      					<a href="biz.html#workexp" className ="blank" ><li className="list-group-item">Work Experiences</li></a>
      					<a href="biz.html#projects" className ="blank" ><li className="list-group-item">Coding Projects</li></a>
      					<a href="biz.html#skills" className ="blank" ><li className="list-group-item">Skills</li></a>
      					<a href="biz.html#future" className ="blank" ><li className="list-group-item">Future Desires</li></a>
      				</ul>
      			</div>
      			<div className="modal-footer">
      				<button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
      			</div>
      		</div>
      	</div>
      </div>
    );
  }
}

class modal3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  };}
  render() {
    return (
        <div>
            <div id="resumePDF" className="modal fade" role="dialog" >
            	<div className="modal-dialog">
            		<div className="modal-content">
            			<div className="modal-body"style="height:75vh;">
            				<object data="resume.pdf"style="height:70vh; width:90%; float: center;" ></object>
            			</div>
            			<div className="modal-footer">
            				<button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
            			</div>
            		</div>
            	</div>
            </div>
            <div id="blurbModal" className="modal fade" role="dialog" >
            	<div className="modal-dialog">
            		<div className="modal-content">
            			<div className="modal-body"style="height:75vh;">
            				<p style ="text-align: center; marginTop: 10px; font-size: 24px"></p>
            			</div>
            			<div className="modal-footer">
            				<button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
            			</div>
            		</div>
            	</div>
            </div>
            </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
