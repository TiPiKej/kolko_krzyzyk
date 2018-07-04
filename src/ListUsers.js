import React, {Component} from 'react';

export default class ListUsers extends Component{
	constructor(props){
		super(props);
		this.state = {
			users: props.userList,
			list: []
		};
	}

	componentWillReceiveProps(props){
		const {userList, win, kolej} = props;
		if(win){
			const lista = this.state.list;

			userList.forEach((el, nr) => {
				if((el.turn === kolej) || (el.name === "Bot")) {
					lista.push(
						<li key={el.turn + Math.floor(Math.random() * 1000)}>{`${(el.name.length > 0? el.name: `Gracz ${el.turn}`)} w ${el.steps +1} ruchach`}</li>
					);
				}
			});

			this.setState({
				list: lista,
				users: userList
			});
		}
	}

	render(){
		return(
			<div>
				{this.state.list.length > 0? "Historia wygranych:": null}
				<ol>
					{this.state.list}
				</ol>
			</div>
		);
	}
}