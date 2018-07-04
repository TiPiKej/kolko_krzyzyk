import React, {Component} from 'react';

export default class History extends Component{
	constructor(props){
		super(props);
	}

	componentWillReceiveProps({history}){
		history
	}

	render(){
		return(
			<div>
				Historia:
			</div>
		);
	}
}