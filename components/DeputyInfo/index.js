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
			miejsce_urodzenia: null,
			okreg_wyborczy: null,
			wyksztalcenie: null,
			zawod: null,
			email: null,

			liczba_glosow: null,
			frekwencja: null,
			wystapienia: null,

			osw: null
		};
	}
	
	componentWillMount() {
		const {state} = this.props.navigation;
		let data = state.params.data;

		this.setState({
			imie: data['imie'],
			klub: data['lista'],

			data_urodzenia: data['data_urodzenia'],
			miejsce_urodzenia: data['miejsce_urodzenia'],
			okreg_wyborczy: data['okreg_wyborczy'],
			wyksztalcenie: data['wyksztalcenie'],
			zawod: data['zawod'],
			email: data['email'],

			liczba_glosow: data['liczba_glosow'],
			frekwencja: data['glosowania'],
			wystapienia: data['wystapienia'],

			osw: data['osw']
		});

	}

	render() {
		const {state} = this.props.navigation;
		let nazwa = state.params.nazwa;
		return(
			//<Text>{this.state.data}</Text>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<Image style={styles.profilePic} source={{uri: 'http://poslowie.ct8.pl/poslowie/' + this.state.imie + '/pic.jpg'}}/>
				</View>

				<View style={styles.basicInfo}>
					<Text style={styles.name}>{nazwa}</Text>
					<Text style={styles.club}>{this.state.klub}</Text>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Data urodzenia: </Text>
						<Text style={styles.fieldContent}>{this.state.data_urodzenia}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Miejsce urodzenia: </Text>
						<Text style={styles.fieldContent}>{this.state.miejsce_urodzenia}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Okręg wyborczy: </Text>
						<Text style={styles.fieldContent}>{this.state.okreg_wyborczy}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Wykształcenie: </Text>
						<Text style={styles.fieldContent}>{this.state.wyksztalcenie}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Zawód: </Text>
						<Text style={styles.fieldContent}>{this.state.zawod}</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Email: </Text>
						<Text style={styles.fieldContent}>{this.state.email}</Text>
					</View>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba głosów:</Text>
						<Text style={styles.fieldContent}>{this.state.liczba_glosow}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Frekwencja:</Text>
						<Text style={styles.fieldContent}>{this.state.frekwencja}</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Wystąpnienia: </Text>
						<Text style={styles.fieldContent}>{this.state.wystapienia}</Text>
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