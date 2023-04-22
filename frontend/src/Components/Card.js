import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function BlockGrid({bc}) {
  return (
    <div className='p-2'> 
    <Card border="primary">
          <Card.Header><b>Hash</b> : {bc[0].hash}</Card.Header>
            <Card.Body>
              <Card.Title><b>Index</b> : {bc[0].index}</Card.Title>
              <Card.Text>
                    {bc[0].data.map(product => (
                        <div>
                            product Name : {product.productName}<br/>
                            Manufacturer ID : {product.manufacturerID}
                            <br/><br/>
                        </div>
                    ))}
              </Card.Text>
            </Card.Body>
    </Card>
    <Row xs={1} md={4} className="p-3">
      {bc.slice(1).map((block) => (
        <Col>
          <Card border="primary">
          <Card.Header><b>Hash</b> : {block.hash}</Card.Header>
            <Card.Body>
              <Card.Title><b>Index</b> : {block.index}</Card.Title>
              <Card.Text>
                    {block.data.map(product => (
                        <div>
                            product Name : {product.productName}<br/>
                            Manufacturer ID : {product.manufacturerID}
                            <br/><br/>
                        </div>
                    ))}
              </Card.Text>
            </Card.Body>
            <Card.Footer><b>prevHash</b> : {block.prevHash}</Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
}

export default BlockGrid;