import React, {Component} from 'react';
import Kolej from './Kolej';
import Pole from './Pole';
import ListUsers from './ListUsers';

export default class KolkoKrzyzyk extends Component{
	constructor(){
		super();


		this.state = {
			kolej: 'X',
			history: [],
			lastMove: Array(9).fill(null),
			win: false,
			textRestartButton: "Restart",
			restart: false,
			userList: [],
			stepNumberX: 0,
			stepNumberO: 0,
			playerXname: "Gracz 1",
			playerOname: "Gracz 2",
			disabledNickNames: false,
			bot: false,
			isBot: false
		}


		const moves = Array(9).fill(null);

		this.state.history.push(moves)
	}

	madeMove = (i, {currentTarget}, who = this.state.kolej) => {
		if(this.state.lastMove[i] === null && !this.state.win && currentTarget.innerText.length === 0){

			// making current diagram <-- this is making err

			// this.state.lastMove[i] = who;


			// adding current turn to history

			const newMove = this.state.lastMove.slice();
			this.state.history.push(newMove);


			// adding step number
			if(this.state.kolej === "X")
				this.setState({stepNumberX: this.state.stepNumberX + 1});
			else 
				this.setState({stepNumberO: this.state.stepNumberO + 1});

			// adding value to clicked field

			currentTarget.innerText = this.state.kolej;



			// check for possible win
			const winner = this.ifWinner(currentTarget);


			// if true --> show confetti
			// if not --> 
			// 						if is bot set --> adding bot move
			// 						if not 				--> changing player

			winner ? this.confettiForWinner() : (
				this.state.bot?
					this.botMove(i, currentTarget):
					this.changePlayer()
			);


			// reset restart state

			this.setState({
				restart: false
			});
		}
	}

	changePlayer = (forWho) => {
		this.setState({
			kolej: forWho === undefined? (this.state.kolej === "X"? "O": "X"): forWho
		});
	}

	ifWinner = (el, bot = false) => {

		/*

			WIN IS WHEN:

			[												[												[
				true, true, true				false, false, false			false, false, false
				false, false, false			true, true, true				false, false, false
				false, false, false			false, false, false			true, true, true
			]												]												]


			[												[
				true, false, false			false, false, true
				false, true, false			false, true, false
				false, false, true			true, false, false
			]												]


			[												[												[
				true, false, false			false, true, false			false, false, true
				true, false, false			false, true, false			false, false, true
				true, false, false			false, true, false			false, false, true
			]												]												]

		*/
		const {parentNode} = el,
					{children} = parentNode;
		let a = [];

		Array.from(children).forEach((el, nr) => {
			((!bot && el.innerText === this.state.kolej) || (bot && el.innerText === "O"))? a.push(true): a.push(false);
		})
		if(
			(a[0] && a[1] && a[2])
	 		||
	 		(a[3] && a[4] && a[5])
	 		||
	 		(a[6] && a[7] && a[8])
	 		||
	 		
	 		(a[0] && a[4] && a[8])
	 		||
	 		(a[6] && a[4] && a[2])

	 		||
	 		(a[0] && a[3] && a[6])
	 		||
	 		(a[1] && a[4] && a[7])
	 		||
	 		(a[2] && a[5] && a[8])
		) return true
		return false
	}	

	confettiForWinner = (isBot = false) => {

		this.setState({
			win: true,
			textRestartButton: "Zagraj ponownie!",
			userList: [
				{
					name: isBot? "Bot" :this.state.playerXname,
					turn: isBot? "" :"X",
					steps: isBot? this.state.stepNumberX :this.state.stepNumberX
				},
				{
					name: this.state.playerOname,
					turn: "O",
					steps: this.state.stepNumberO
				}
			],
			disabledNickNames: true,
			isBot: isBot
		});
		// alert(`You win player ${this.state.kolej}`)
	}

	restartGame = () => {
		if(this.state.win && !this.state.bot) this.changePlayer();

		this.setState({
			history: [],
			lastMove: Array(9).fill(null),
			win: false,
			textRestartButton: "Restart",
			restart: true,
			stepNumberO: 0,
			stepNumberX: 0,
			disabledNickNames: false,
			isBot: false
		});
	}
// madeMove = (i, {currentTarget}, who = this.state.kolej)
	botMove = (i, el) => {

		// poprawić to!!! // brak wina u bota i błąd co jakiś czas
		const {parentNode} = el,
					{children} = parentNode,
					totalSteps = this.state.stepNumberX + this.state.stepNumberO + 1;

		let freeSpace = [];

		Array.from(children).forEach((el, nr) => {
			if(el.innerText.length === 0 && nr !== i) freeSpace.push(el)
		});

		const max = 8 - (totalSteps * 2),
					min = 0;

		const botmove = Math.floor(Math.random() * (max - min) + min);

		// console.log(max, totalSteps * 2, botmove)
		// console.log(freeSpace)
		// console.log(freeSpace[botmove])
		// console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
		if(freeSpace[botmove] !== undefined){
			freeSpace[botmove].innerText = "O";
			freeSpace[botmove].onClick = null;
		}

		// checking for win bot

		const winner = this.ifWinner(el, true);

		if(winner) this.confettiForWinner(true);
	}

	modifyNameOfPlayer = ({currentTarget}, player) => {
		this.setState({
			[player]: currentTarget.value
		})
	}

	modifyBotActivites = () => {
		this.setState({
			bot: this.state.bot? false: true
		});
		this.restartGame();
		this.changePlayer("X");
	}

	render(){
		const inputStyle = {
			width: '200px',
			marginLeft: '10px'
		}

		return(
			<div style={{
						display: 'flex',
						flexDirection: 'row'
					}}>
				<div className="kolkokrzyz">
					<p>Gracze:</p>
					<p>
						<label>
							Gracz 1:  
								<input 
									type="text" 
									onChange={e => this.modifyNameOfPlayer(e, 'playerXname')} 
									style={inputStyle} 
									value={this.state.playerXname} 
									disabled={this.state.disabledNickNames} />
						</label>
					</p>
						
						<p>
							<label>
								Play with bot: 
									<input
										type="checkbox"
										checked={this.state.bot}
										onChange={this.modifyBotActivites} />
							</label>
						</p>
						{this.state.bot? null: (
							<p>
								<label>
									Gracz 2: 
										<input 
											type="text" 
											onChange={e => this.modifyNameOfPlayer(e, 'playerOname')} 
											style={inputStyle} 
											value={this.state.playerOname} 
											disabled={this.state.disabledNickNames} />
								</label>
							</p>
						)}
					
					<Kolej 
						nazwaX={this.state.playerXname}
						nazwaO={this.state.playerOname}
						kolej={this.state.kolej}
						win={this.state.win}
						isBot={this.state.isBot} />
					<Pole 
						kolej={this.state.kolej} 
						onMove={(i, el) => this.madeMove(i, el)}
						restart={this.state.restart} />
					<button onClick={this.restartGame}>{this.state.textRestartButton}</button>
					<h3>
						{(this.state.stepNumberO + this.state.stepNumberX) > 0? "Nr ruchu: " + (this.state.stepNumberO + this.state.stepNumberX): null}
					</h3>
				</div>
				<div 
					style={{
						marginLeft: '40px'
					}}>
					<ListUsers
						userList={this.state.userList}
						win={this.state.win}
						restart={this.restartGame}
						kolej={this.state.kolej} />
				</div>
			</div>
		);
	}
}