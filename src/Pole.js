import React, {Component} from 'react';
import './css/kolkoikrzyzyk.css';

export default class Pole extends Component{
	constructor(props){
		super(props);


		this.state = {
			kolej: props.kolej,

			// creating fields
			fields: this.createFields()
		}
	}

	componentWillReceiveProps({restart}){
		if(restart){
			document.querySelectorAll('.polekolkoikrzyzyk div').forEach(el => el.innerText = '');
		}
	}


	createFields = () => {
		let fields = [];

		for(let i = 0; i <= 8; i++){
			fields.push(
				<div
					onClick={el => this.props.onMove(i, el)}
					key={`field${i}`}></div>
			);
		}

		return fields;	
	}

	render(){
		return(
			<div className="polekolkoikrzyzyk">
				{this.state.fields}
			</div>
		);
	}
}