import './App.css';
import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Logo from "./logo.png";
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      result: [],
      isLoading: false,
      wordCount: 0,
      wordTotal: 0
    };
  }

  handleClick = async () => {
    if (this.state.data !== '') {
      this.setState({ isLoading: true });
      this.setState({ result: [] });
      let data = this.state.data.slice(0, 2120);
      console.log(data);
      await fetch("https://api-inference.huggingface.co/models/roberta-base-openai-detector",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify({ "inputs": data }),
        }
      ).then((response) => response.json())
      .then(results => {
        this.setState({ result: results });
        this.setState({ wordCount: this.state.data.slice(0, 2120).split(' ').length })
        this.setState({ wordTotal: this.state.data.split(' ').length })
      });
    } else {
      alert('Please add content to the text section first.');
      document.getElementById("contentInput").focus()
    }
  }
  
  dataSet = (e) => {
    this.setState({ data: e.target.value });
  }
  
  render() {
    let finalResult = this.state.result;
    return(
      <div className="App">
        <Container>
          <div className='row'>
            <div className='col-lg-2 col-md-12'></div>
            <div className='col-lg-8 col-md-12'>
              <a href="/">
                <Image src={Logo} className="mx-auto d-block"/>
              </a>
              <h1 className='text-center mt-3'>Content Quality Detector</h1>
              <FloatingLabel controlId="contentInput" label="Past Your Content">
                <Form.Control
                  as="textarea"
                  placeholder=""
                  style={{ minHeight: '300px', marginTop: '30px' }}
                  onMouseLeave={this.dataSet}
                />
              </FloatingLabel>
              <Button 
                variant="primary"
                size="md"
                className='mt-4 w-100'
                onClick={this.handleClick}
                disabled={this.state.isLoading}
                style={{ background: '#C71F2C'}}
                >
                {this.state.isLoading && <Spinner animation="border" variant="light" size="sm" />} {this.state.isLoading ? 'Loading...' : 'Compute'}
              </Button>
            </div>
            <div className='col-lg-2 col-md-12'></div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-2 col-md-12'></div>
            <div className='col-lg-8 col-md-12 border-1'>
              <ListGroup className='mt-3'>
                {this.state.wordCount > 0 && (
                <ListGroup.Item className="p-3 text-center">
                    Prediction based on the first <Badge bg="secondary">{this.state.wordCount}</Badge> words among the total <Badge bg="success">{this.state.wordTotal}</Badge>
                </ListGroup.Item>
                )
              }
              {finalResult.map((r) => {
                this.setState({ isLoading: false });
                  return r.map((rs) => {
                    let score = Math.round(rs.score * 100);
                    return (
                      <ListGroup.Item key={rs.label} className="p-3">
                        <h6 className='float-end mt-1'>{`${score}%`}</h6>
                        <h5>{rs.label}</h5>
                        <ProgressBar animated now={score} className="mt-2" variant={rs.label === 'Fake' ? 'success' : 'primary'} />
                      </ListGroup.Item>
                    )
                  })
                })
              }
              </ListGroup>
            </div>
            <div className='col-lg-2 col-md-12'></div>
          </div >
        </Container>
      </div>
    )
  };
}

export default App;
