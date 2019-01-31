import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

class DeputyScreen extends React.Component {

	static navigationOptions = {
		title: 'ZnajdźPosła',
		headerTitleStyle: {
			fontWeight: 'normal'
		},
		headerStyle: {
			backgroundColor: '#29b6f6'
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			deputiesRendered: null
		};
	}

	componentWillMount() {
		const { navigate } = this.props.navigation;
		fetch('https://api-v3.mojepanstwo.pl/dane/poslowie.json?conditions[poslowie.kadencja]=8&limit=460')
		.then(resp => resp.json())
		.then(resp => {
			let deputies = resp['Dataobject']
			let deputiesRendered = [];
			deputies.forEach(function(deputy) {
				deputiesRendered.push(
					<TouchableOpacity style={styles.deputyData} onPress={() => navigate('DeputyInfo', {id: deputy['data']['poslowie.id']})}>
						<Image style={styles.profilePic} source={{uri: 'https://s3.eu-central-1.amazonaws.com/sejmometr/speakers/'+ deputy['data']['poslowie.numer_legitymacji'] + '-0.jpg'}}/>
						<View style={styles.deputyInfo}>
							<Text style={styles.deputyName}>{deputy['data']['ludzie.nazwa']}</Text>
							<Text style={styles.deputyClub}>{deputy['data']['sejm_kluby.skrot']}</Text>
						</View>
					</TouchableOpacity>
				);
			})

			this.setState({deputiesRendered: deputiesRendered});
		});
	}

	render() {
		return(
			<ScrollView>{this.state.deputiesRendered}</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	deputyData: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#e2e2e2',
		flexDirection: 'row'
	},

	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 200
	},

	deputyInfo: {
		marginLeft: 10
	},

	deputyName: {
		fontWeight: 'bold'
	},

	deputyClub: {

	}
});

export default DeputyScreen;