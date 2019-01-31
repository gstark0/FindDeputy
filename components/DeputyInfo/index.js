import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

class DeputyInfo extends React.Component {
	
	static navigationOptions = {
		title: 'Poseł',
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
			imie: null,
			klub: null,

			data_urodzenia: null,
			miesjce_urodzenia: null,
			okreg_wyborczy: null,
			numer_legitymacji: null,
			zawod: null,
			liczba_projektow_ustaw: null,
			liczba_wypowiedzi: null,
			liczba_glosowan: null,
			liczba_glosowan_opuszczonych: null,
			liczba_wyjazdow: null,
			liczba_przelotow: null,
			wartosc_uposazenia: null,
			wartosc_wyjazdow: null
		};
	}
	
	componentWillMount() {
		const {state} = this.props.navigation;
		let id = state.params.id;

		fetch('https://api-v3.mojepanstwo.pl/dane/poslowie/' + id)
		.then(resp => resp.json())
		.then(resp => {
			resp = resp['data'];
			this.setState({
				imie: resp['ludzie.nazwa'],
				klub: resp['sejm_kluby.nazwa'],

				data_urodzenia: resp['poslowie.data_urodzenia'],
				miesjce_urodzenia: resp['poslowie.miejsce_urodzenia'],
				okreg_wyborczy: resp['poslowie.sejm_okreg_id'],
				numer_legitymacji: resp['poslowie.numer_legitymacji'],
				zawod: resp['poslowie.zawod'],

				frekwencja: resp['poslowie.frekwencja'],
				liczba_projektow_ustaw: resp['poslowie.liczba_projektow_ustaw'],
				liczba_wypowiedzi: resp['poslowie.liczba_wypowiedzi'],
				liczba_glosowan_opuszczonych: resp['poslowie.liczba_glosowan_opuszczonych'],
				liczba_glosowan: resp['poslowie.liczba_glosowan'],
				liczba_wyjazdow: resp['poslowie.liczba_wyjazdow'],
				liczba_przelotow: resp['poslowie.liczba_przelotow'],

				wartosc_uposazenia: resp['poslowie.wartosc_uposazenia_pln'],
				wartosc_wyjazdow: resp['poslowie.wartosc_wyjazdow']
			});
		})
	}

	render() {
		return(
			//<Text>{this.state.data}</Text>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<Image style={styles.profilePic} source={{uri: 'https://s3.eu-central-1.amazonaws.com/sejmometr/speakers/' + this.state.numer_legitymacji + '-0.jpg'}}/>
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
				</View>

				<View style={styles.fieldsContainer}>
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
						<Text style={styles.fieldName}>Liczba opuszczonych głosowań: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_glosowan_opuszczonych}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba wyjazdów: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_wyjazdow}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba przelotów: </Text>
						<Text style={styles.fieldContent}>{this.state.liczba_przelotow}</Text>
					</View>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Wartość uposażenia: </Text>
						<Text style={styles.fieldContent}>{this.state.wartosc_uposazenia} zł</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Wartość wyjazdów: </Text>
						<Text style={styles.fieldContent}>{this.state.wartosc_wyjazdow} zł</Text>
					</View>
				</View>
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