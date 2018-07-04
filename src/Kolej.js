import React, {Component} from 'react';

export default class KolkoKrzyzyk extends Component{
	constructor(props){
		super(props);
		this.state = {
			kolej: props.kolej,
			win: props.win,
			nazwaX: props.nazwaX,
			nazwaO: props.nazwaO,
			isBot: props.isBot
		}
	}

	componentWillReceiveProps({kolej, win, nazwaX, nazwaO, isBot}){
		this.setState({
			kolej, win, nazwaX, nazwaO, isBot
		});
	}
	render(){
		return(
			<h1>
				{
					this.state.isBot?(
						"Wygrał bot"
					):(
						this.state.win?(
							"Wygrał gracz: "
						):(
							"Teraz twoja kolej: "
						)
					)
				}
				{this.state.isBot?null: (
					this.state.kolej === 'X'?(
						this.state.nazwaX.length > 0? `${this.state.nazwaX} (${this.state.kolej})`: "Gracz X"
					):(
						this.state.nazwaO.length > 0? `${this.state.nazwaO} (${this.state.kolej})`: "Gracz O"
					)
				)}
				{this.state.win?"!": null}
			</h1>
		);
	}
}