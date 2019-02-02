import React from 'react';
import { StyleSheet, View, Text, Button, Image, Linking } from 'react-native';

class DeputyInfo extends React.Component {
	
	static navigationOptions = {
		title: 'Poseł',
		headerTitleStyle: {
			fontWeight: 'normal',
			color: '#fff'
		},
		headerStyle: {
			backgroundColor: '#1976d2'
		}
	}

	constructor(props) {
		super(props);
		
		this.state = {
			imie: null,
			klub: null,

			data_urodzenia: null,
			miesjce_urodzenia: null,
			okreg_wyborczy: null,
			numer_legitymacji: null,
			zawod: null,

			procent_glosow: null,
			liczba_projektow_ustaw: null,
			liczba_wypowiedzi: null,
			liczba_glosowan: null,
			liczba_glosowan_opuszczonych: null,
			liczba_glosowan_zbuntowanych: null,

			osw: null
		};
	}
	
	componentWillMount() {
		const {state} = this.props.navigation;
		let id = state.params.id;

		fetch('https://api-v3.mojepanstwo.pl/dane/poslowie/' + id)
		.then(resp => resp.json())
		.then(resp => {
			resp = resp['data'];

			let imie = resp['ludzie.nazwa'];

			fetch('http://poslowie.ct8.pl/poslowie/' + imie.replace(' ', '%20') + '/osw.txt')
			.then(resp2 => {
				this.setState({
					imie: imie,
					klub: resp['sejm_kluby.nazwa'],

					data_urodzenia: resp['poslowie.data_urodzenia'],
					miesjce_urodzenia: resp['poslowie.miejsce_urodzenia'],
					okreg_wyborczy: resp['poslowie.sejm_okreg_id'],
					numer_legitymacji: resp['poslowie.numer_legitymacji'],
					zawod: resp['poslowie.zawod'],

					procent_glosow: resp['poslowie.procent_glosow'],
					frekwencja: resp['poslowie.frekwencja'],
					liczba_projektow_ustaw: resp['poslowie.liczba_projektow_ustaw'],
					liczba_wypowiedzi: resp['poslowie.liczba_wypowiedzi'],
					liczba_glosowan_opuszczonych: resp['poslowie.liczba_glosowan_opuszczonych'],
					liczba_glosowan_zbuntowanych: resp['poslowie.liczba_glosowan_zbuntowanych'],
					liczba_glosowan: resp['poslowie.liczba_glosowan'],

					osw: resp2['_bodyText']
				});
			});

		})
	}

	render() {
		return(
			//<Text>{this.state.data}</Text>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<Image style={styles.profilePic} source={{uri: 'http://poslowie.ct8.pl/poslowie/' + this.state.imie + '/pic.jpg'}}/>
				</View>

				<View style={styles.basicInfo}>
					<Text style={styles.name}>{this.state.imie}</Text>
					<Text style={styles.club}>{this.state.klub}</Text>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Data urodzenia: </Text>
						<Text style={styles.fieldContent}>{this.state.data_urodzenia}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Miejsce urodzenia: </Text>
						<Text style={styles.fieldContent}>{this.state.miesjce_urodzenia}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Okręg wyborczy: </Text>
						<Text style={styles.fieldContent}>{this.state.okreg_wyborczy}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Zawód: </Text>
						<Text style={styles.fieldContent}>{this.state.zawod}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Numer legitymacji: </Text>
						<Text style={styles.fieldContent}>{this.state.numer_legitymacji}</Text>
					</View>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Procent głosów:</Text>
						<Text style={styles.fieldContent}>{this.state.procent_glosow}%</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Frekwencja:</Text>
						<Text style={styles.fieldContent}>{this.state.frekwencja}%</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba projektów ustaw: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_projektow_ustaw}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba wypowiedzi: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_wypowiedzi}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba głosowań: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_glosowan}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba głosowań opuszconych: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_glosowan_opuszczonych}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba głosowań zbuntowanych: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_glosowan_zbuntowanych}</Text>
					</View>
				</View>

				<Button title='Zobacz oświadczenie majątkowe' onPress={ ()=>{ Linking.openURL( this.state.osw )}}></Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#efefef',
		flex: 1,
		padding: 15
	},

	profileContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15
	},

	profilePic: {
		width: 100,
		height: 100,
		borderRadius: 200
	},

	basicInfo: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15
	},

	name: {
		fontWeight: 'bold',
		fontSize: 18
	},

	club: {
		fontSize: 18
	},

	fieldsContainer: {
		backgroundColor: '#fff',
		padding: 15,
		marginBottom: 15
	},

	field: {
		flexDirection: 'row',
	},

	fieldName: {
		fontSize: 18,
		color: '#777',
	},

	fieldContent: {
		marginLeft: 'auto',
		fontSize: 18
	}
});

export default DeputyInfo;