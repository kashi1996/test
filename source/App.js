import React, { Component } from "react";
import { View } from "react-native";
// import the firebase third party lib
import firebase from "firebase";
// Custom Components to be used in the app

// Import our LoginForm component to be displayed on the screen
import Header from "./components/common/Header";
import CustomButton from "./components/common/CustomButton";
import CardSection from "./components/common/CardSection";
import Card from "./components/common/Card";
import Spinner from "./components/common/Spinner";
import LoginForm from "./components/LoginForm";  
class App extends Component {
state = { loggedIn: null };
// Life cycle method to init the firebase
componentWillMount() {
firebase.initializeApp({     apiKey: "AIzaSyCdDHoKZPxY3P_7JxQC8tn60sFa8ip9nH0",
    authDomain: "signindone-155af.firebaseapp.com",
    databaseURL: "https://signindone-155af.firebaseio.com",
    projectId: "signindone-155af",
    storageBucket: "signindone-155af.appspot.com",
    messagingSenderId: "1049704296942"
});

//Handle the Application when it's logged in or logged out
firebase.auth().onAuthStateChanged(user => {
if (user) {
this.setState({ loggedIn: true });
} else {
this.setState({ loggedIn: false });
}
});
}

renderContent() {
switch (this.state.loggedIn) {
case true:
return (
<Card>
<CardSection>
<CustomButton onPress={() => firebase.auth().signOut()}>
Logout
</CustomButton>
</CardSection>
</Card>
);
case false:
return <LoginForm />;
default:
return <Spinner size="large" />;
}
}
render() {
return (
<View>
<Header headerText="Authentication"/>
{this.renderContent()}
{/* 
Before the renderContent Handling
<LoginForm /> */}
</View>
);
}
}

export default App;
