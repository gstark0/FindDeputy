import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Searchbar } from 'react-native-paper';

class DeputyScreen extends React.Component {

	static navigationOptions = {
		title: 'ZnajdźPosła',
		headerTitleStyle: {
			fontWeight: 'normal',
			color: '#fff'
		},
		headerStyle: {
			backgroundColor: '#1976d2',
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
						<Image style={styles.profilePic} source={{uri: 'http://poslowie.ct8.pl/poslowie/'+ deputy['data']['ludzie.nazwa'] + '/pic.jpg'}} />
						<View style={styles.deputyInfo}>
							<Text style={styles.deputyName}>{deputy['data']['ludzie.nazwa']}</Text>
							<Text style={styles.deputyClub}>{deputy['data']['sejm_kluby.skrot']}</Text>
						</View>
					</TouchableOpacity>
				);
			})

			this.setState({
				deputiesRendered: deputiesRendered,
				allDeputies: deputiesRendered
			});
		});
	}

	render() {
		return(
			<View>
				<Searchbar placeholder="Szukaj posła..." onChangeText={query => {
					let allDeputies = this.state.allDeputies;
					let foundDeputies = [];
					allDeputies.forEach(function(deputy) {
						if(deputy['props']['children'][1]['props']['children'][0]['props']['children'].toLowerCase().includes(query.toLowerCase())) {
							foundDeputies.push(deputy);
						}
					});
					this.setState({deputiesRendered: foundDeputies});
				}}/>
				<ScrollView>{this.state.deputiesRendered}</ScrollView>
			</View>
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
		marginLeft: 10,
		justifyContent: 'center'
	},

	deputyName: {
		fontWeight: 'bold'
	},

	deputyClub: {

	}
});

export default DeputyScreen;