import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
			deputiesRendered: null,
			loaderDisplay: true
		};
	}

	componentWillMount() {
		const { navigate } = this.props.navigation;
		fetch('http://sejm.opendata.website/poslowie')
		.then(resp => resp.json())
		.then(resp => {
			let deputiesRendered = [];
			resp.forEach(function(deputy) {
				let nazwa = deputy['imie'].split(' ');
				nazwa = nazwa[1] + ' ' + nazwa[0];
				console.log(nazwa);
				deputiesRendered.push(
					<TouchableOpacity style={styles.deputyData} onPress={() => navigate('DeputyInfo', {data: deputy, nazwa: nazwa})}>
						<Image style={styles.profilePic} source={{uri: 'http://poslowie.ct8.pl/poslowie/'+ deputy['imie'] + '/pic.jpg'}} />
						<View style={styles.deputyInfo}>
							<Text style={styles.deputyName}>{nazwa}</Text>
							<Text style={styles.deputyClub}>{deputy['klub']}</Text>
						</View>
					</TouchableOpacity>
				);
			})

			this.setState({
				deputiesRendered: deputiesRendered,
				allDeputies: deputiesRendered,
				loaderDisplay: false
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
				<ActivityIndicator size="large" color="#1976d2" style={this.state.loaderDisplay ? null : { display: "none" }}/>
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