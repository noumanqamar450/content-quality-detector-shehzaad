import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./App.css";

function Header(props){

    return(
    <>
        {['lg'].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3" style={{ padding: "15px 0px", backgroundColor: "#6300E2" }} sticky="top">
                <Container fluid>
                    <Navbar.Brand href="/"><img src="/ai-content-detector/logo.png" alt="TextX" style={{ width: "120px" }} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='justify-content-end custom-nav'>
                            <Nav>
                                {
                                    props.menu.length > 0 && props.menu.map((m, i) => {
                                        return (
                                            <div key={i}>  
                                                {(m.parent === 0) && (
                                                    <div  className='navBarCustom'>
                                                        <Nav.Link 
                                                        href={m.url}
                                                        >{m.title.rendered}</Nav.Link>
                                                        <ul  className='dropDownMenu' >
                                                            {props.menu.length > 0 && props.menu.filter(f => f.parent === m.id).map((p, i) => 
                                                                <Nav.Link href={p.url} key={i}>{p.title.rendered}</Nav.Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        ))}
    </>
    );
}

export default Header;