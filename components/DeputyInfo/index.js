import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

class DeputyInfo extends React.Component {
	
	static navigationOptions = {
		title: 'Poseł'
	}

	constructor(props) {
		super(props);
		
		this.load = this.load.bind(this);
		this.state = {
			data: null
		};
	}
	
	load() {
		const {state} = this.props.navigation;
		let id = state.params.id;

		fetch('https://api-v3.mojepanstwo.pl/dane/poslowie/' + id)
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp);
			this.setState({data: 'resp'});
		})
	}

	render() {
		this.load();
		return(
			//<Text>{this.state.data}</Text>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<Image style={styles.profilePic} source={{uri: 'https://s3.eu-central-1.amazonaws.com/sejmometr/speakers/1-0.jpg'}}/>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Data urodzenia: </Text>
						<Text style={styles.fieldContent}>1961-03-10</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Miejsce urodzenia: </Text>
						<Text style={styles.fieldContent}>Kolbuszowa</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Okręg wyborczy: </Text>
						<Text style={styles.fieldContent}>23 Rzeszów</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba głosów: </Text>
						<Text style={styles.fieldContent}>18197</Text>
					</View>

					<View style={styles.field}>
						<Text style={styles.fieldName}>Zawód: </Text>
						<Text style={styles.fieldContent}>Inżynier inżynierii środowiska</Text>
					</View>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba projektów ustaw: </Text>
						<Text style={styles.fieldContent}>56</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba wypowiedzi: </Text>
						<Text style={styles.fieldContent}>59</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba wyjazdów: </Text>
						<Text style={styles.fieldContent}>1</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Liczba przelotów: </Text>
						<Text style={styles.fieldContent}>39</Text>
					</View>
				</View>

				<View style={styles.fieldsContainer}>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Wartość uposażenia: </Text>
						<Text style={styles.fieldContent}>9892.3 zł</Text>
					</View>
					<View style={styles.field}>
						<Text style={styles.fieldName}>Wartość wyjazdów: </Text>
						<Text style={styles.fieldContent}>15612.06 zł</Text>
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