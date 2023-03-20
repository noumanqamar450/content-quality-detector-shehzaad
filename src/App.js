import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Reviews from './Reviews';
import Software from './Software';
import Footer from './Footer';
import Content from './Content';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      setMenu: []
    };
  }

  componentDidMount(){
    const url = 'https://textx.org/wp-json/wp/v2/menu-items?menus=3';

    fetch(url, {
      headers: {
        'Authorization': 'Basic dGV4dHhhZG1pbjIwMjM6WmVlc2hhbkAxQDJAMw==',
      },
    }).then(response => response.json())
      .then(menu => {
        this.setState({ setMenu: menu })
      });
  }
  render() {
    return(
      <>
      <Header menu={this.state.setMenu}/>
      <div className="app">
        <Container fluid>
          <Software/>
        </Container>
        <Container>
        <Content/>
        <Reviews/>
        </Container>
      </div>
      <Footer/>
      </>
    )
  };
}

export default App;
