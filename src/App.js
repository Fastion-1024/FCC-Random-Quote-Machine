import QuoteBox from './Components/QuoteBox';
import Filters from './Components/Filters';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useGlobalContext } from './context';

function App() {
    const { loading } = useGlobalContext();

    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }
    return (
        <main>
            <Container>
                <Col>
                    <QuoteBox />
                    <Filters />
                </Col>
            </Container>
        </main>
    );
}

export default App;
