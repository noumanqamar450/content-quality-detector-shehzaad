import React from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
// import Badge from 'react-bootstrap/Badge';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import parse from 'html-react-parser';

class Software extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            result: [],
            isLoading: false,
            wordCount: 0,
            wordTotal: 0,
            editor: 'Paste your text here',
            rightSideContent: []
        };
    }
    // AI
    handleClick = async () => {
        if (this.state.data !== '') {
            this.setState({ isLoading: true });
            this.setState({ result: [] });
            let data = this.state.data;
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
                    this.setState({ wordTotal: this.state.editor.split(' ').length })
                });
        } else {
            alert('Please add content to the text section first.');
        }
        setTimeout(()=>{
            this.setState({ isLoading: false })
        }, 500)
        
    }

    resultNot = (r) => {
        if (r > 75) {
            return <h4>🤩 Highly likely to be Human!</h4>
        } else if(r > 40) {
            return <h4>😔 Unclear if it is AI content!</h4>
        } else if (r > 0) {
            return <h4>👎 Likely to be AI generated!</h4>
        }
    } 
    
    async componentDidMount() {
        // Content
        await fetch("https://textx.org/wp-json/wp/v2/ai-content-detector")
            .then((response) => response.json())
            .then(content => {
                this.setState({ rightSideContent: content });
            });
    }

    onChange = (e) => {
        let text = e.target.value
        this.setState({ editor: text })
        text = text.replace(/(<([^>]+)>)/ig, '')
        text = text.slice(0, 1400);
        this.setState({ data: text })
        this.setState({ result: [] });
        this.setState({ wordCount: 0 })
        this.setState({ wordTotal: 0 })
        if (text.length > 0) {
            document.querySelector('.clearBtn').style.display = 'block'
        } else {
            document.querySelector('.clearBtn').style.display = 'none' 
        }
        
    }
    
    
    handleRemove = () => {
        this.setState({ editor: 'Paste your text here' })
        this.setState({ data: '' })
        this.setState({ result: [] });
        this.setState({ wordCount: 0 })
        document.querySelector('.clearBtn').style.display = 'none'
    }

    textSelectHandler = (e) => {
        if (e.target.innerHTML === 'Paste your text here'){
            document.execCommand('selectAll', false, null)
        }
    }
    
    
    render() {
        let editor = this.state.editor;
        let finalResult = this.state.result;
        let aiResult = finalResult.length > 0 ? finalResult.map((r) => r.find((s) => s.label === 'Fake')) : [{score:0}]
        let humanResult = finalResult.length > 0 ? finalResult.map((r) => r.find((s) => s.label === 'Real')) : [{ score: 0 }]
        aiResult = aiResult.length > 0 && aiResult.map(r => Math.round(r.score * 100));
        humanResult = humanResult.length > 0 && humanResult.map(r => Math.round(r.score * 100))
        return (
            <>
                <div className="bg-content"></div>
                <div className='row' style={{position: 'relative', zIndex:'2'}}>
                    <h1 className='text-center text-white mt-3 main-title'>AI Content Detector</h1>
                    <div className='col-lg-3 order-md-1 col-md-12 order-1'>
                        <div className="resultCard">
                            {
                                this.state.rightSideContent.filter(c => c.categories[0] === 127).map((c) => {
                                    return (
                                        parse(c.content.rendered)
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 order-md-2 order-sm-0'>
                        <div className='mt-5 textEditor'>
                            <DefaultEditor value={editor} onChange={this.onChange} onClick={this.textSelectHandler}/>
                            <Button
                                variant="primary"
                                size="md"
                                className='mt-4 btn-danger clearBtn'
                                id='clearBtn'
                                onClick={this.handleRemove}
                                style={{ display: 'none' }}
                            >
                                Clear Text
                            </Button>
                        </div>
                        <Button
                            variant="primary"
                            size="md"
                            className='mt-4 w-100 btn-lg'
                            onClick={this.handleClick}
                            disabled={this.state.isLoading}
                            style={{ background: '#6300E2' }}
                        >
                            {this.state.isLoading && <Spinner animation="border" variant="light" size="sm" />} {this.state.isLoading ? 'Detecting...' : 'Detect AI'}
                        </Button>
                    </div>
                    <div className='col-lg-3 col-md-12 order-md-3' id='result'>
                        <div className="resultCard">
                            <h2 className='card-title'>Content Score</h2>
                            <div className="resultCircle">
                                <div className="result">
                                    <h4><Badge>Human</Badge></h4>
                                    <CircularProgressbar 
                                        value={humanResult}
                                        text={humanResult + '%'}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            textSize: '25px',
                                            pathTransitionDuration: 0.5,
                                            textColor: '#020202',
                                            pathColor: `#6300E2`,
                                        })}
                                    />

                                </div>
                                <div className="result">
                                    <h4><Badge bg='danger'>AI</Badge></h4>
                                    <CircularProgressbar
                                        value={aiResult}
                                        text={aiResult + '%'}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            textSize: '25px',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `#dc3545`,
                                            textColor: '#020202',
                                        })}
                                    />
                                </div>
                            </div>
                            {
                                this.resultNot(humanResult)
                            }
                            <div className="content">
                                {
                                    this.state.rightSideContent.filter(c => c.categories[0] === 125).map((c) => {
                                        return (
                                            parse(c.content.rendered)
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Software;