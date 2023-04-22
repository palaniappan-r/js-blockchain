import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function basicNav() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="mx-auto" style={{color: '#ffffff', fontSize: '36px', fontWeight: 'bold'}}>productChain</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default basicNav;
