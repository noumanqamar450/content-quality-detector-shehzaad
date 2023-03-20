const Footer = () => {
    return(
        <>  
            <div className="footer">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-4 col-sm-12">
                            <a href="/"><img src="/ai-content-detector/logo-dark.png" alt="TextX" style={{ maxWidth: "180px" }} /></a>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><a href="/">Home</a></li>
                                <li className="list-group-item"><a href="/about-us">About Us</a></li>
                                <li className="list-group-item"><a href="/blogs">blogs</a></li>
                                <li className="list-group-item"><a href="/contact-us">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><a href="/reviews/">Reviews</a></li>
                                <li className="list-group-item"><a href="/privacy-policy/">Privacy Policy</a></li>
                                <li className="list-group-item"><a href="/terms-and-conditions/">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="float-end">Powered By <a href="https://antech.pk" className="" target="_new"><b></b>AN TECH</a></p>
                    <p className="float-start">Copyright © {new Date().getFullYear()} TextX</p>
                </div>
            </div>
        </>
    )
}

export default Footer;