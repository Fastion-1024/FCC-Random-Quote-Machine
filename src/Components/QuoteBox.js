import { useGlobalContext } from '../context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaTwitter, FaFilter } from 'react-icons/fa';
import Loading from './Loading';

const QuoteBox = () => {
    const { quote, fetchQuote, openSidebar, loading } = useGlobalContext();
    return (
        <section id='quote-box'>
            <figure>
                <blockquote className='blockquote text-center'>
                    <span id='text'>
                        {loading ? <Loading /> : quote.content}
                    </span>
                </blockquote>
                <figcaption
                    id='author'
                    className={loading ? '' : 'blockquote-footer text-end'}
                >
                    {loading ? '' : quote.author}
                </figcaption>
            </figure>

            <Container className='d-flex justify-content-start'>
                <Button className='secondary-btn' onClick={openSidebar}>
                    <FaFilter />
                </Button>

                <Button
                    id='tweet-quote'
                    className='secondary-btn'
                    href={
                        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                        encodeURIComponent(
                            '"' + quote.content + '" ' + quote.author
                        )
                    }
                    target='_blank'
                >
                    <FaTwitter />
                </Button>
            </Container>

            <Button id='new-quote' onClick={fetchQuote}>
                New Quote
            </Button>
        </section>
    );
};

export default QuoteBox;
