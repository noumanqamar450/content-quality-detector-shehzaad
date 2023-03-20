import React from 'react';
import parse from 'html-react-parser';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loader: true,
            content: []
        };
    }

    async componentDidMount() {
    // Content
    await fetch("https://textx.org/wp-json/wp/v2/ai-content-detector")
        .then((response) => response.json())
        .then(content => {
            this.setState({ content: content });
            this.setState({ is_loader: false });
        });
    }
    render() {
        let content = this.state.content;
        // content = content.find(c => c.categories[] )
        return (
            <>
                <div className="row mt-5 mb-5">
                    <div className="col-lg-12 col-md-12 justify-content-center">
                    <p style={this.state.is_loader ? {} : { display: "none" }}>Loading...</p>
                        {
                            content.length > 0 && content.filter(c => c.categories[0] === 126).map((c) => {
                                return(
                                    parse(c.content.rendered)
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Content;