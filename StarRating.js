import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
export default class StarRating extends Component {
	static propTypes = {
		maxStars: PropTypes.number,
		disabled: PropTypes.bool,
		rating: PropTypes.number,
	}
	static defaultProps = {
		maxStars: 5,
		rating: 0,
		disabled: false,
	}
	constructor(props) {
		super(props);
		this.state = { rating: this.props.rating || 0 }
	}
	render() {
		let { maxStars } = this.props;
		let { rating } = this.state;

		let stars = [];
		const starChar = '\u2605';
		for (let i = 0; i < maxStars; i++) {
			let starEl = <TouchableOpacity name="start" key={i}
				style={[style.starIcon, rating >= i + 1 && style.active, this.props.style]}
				onPress={this.onStarPress(i)} >
				<Text>{starChar}</Text>
			</TouchableOpacity>;
			stars.push(starEl);
		}
		return (
			<View style={style.starsWrap}>
				{stars}
			</View>
		)
	}
	onStarPress = (i) => () => {
		if (this.props.disabled) {
			return false;
		}

		const newRating = i + 1;

		if (this.props.onStarChange) {
			this.props.onStarChange(newRating);
		}
		this.setState({ rating: newRating });
	}
	
}

const style = StyleSheet.create({
	starIcon: {
		fontSize: 30,
		color: '#d7d7d7',
		paddingRight: 10,
	},
	active: { color: '#ffcd06' },
	starsWrap: {
		flexDirection: 'row'
	}
})