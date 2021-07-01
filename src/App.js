import QuoteBox from './Components/QuoteBox';
import Filters from './Components/Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGlobalContext } from './context';

function App() {
    const { loading, iSidebarOpen } = useGlobalContext();

    // if (loading) {
    //     return (
    //         <main>
    //             <h1>Loading...</h1>
    //         </main>
    //     );
    // }
    return (
        <main>
            <div className='background' />
            <Container className='full-height'>
                <Row className='d-flex full-height justify-content-center align-items-center'>
                    <Col
                        xxl={5}
                        xl={6}
                        lg={6}
                        md={7}
                        sm={8}
                        xs={9}
                        className='align-self-center'
                    >
                        <QuoteBox />
                    </Col>
                </Row>
            </Container>
            {iSidebarOpen && <Filters />}
        </main>
    );
}

export default App;
