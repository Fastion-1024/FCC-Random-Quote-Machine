import { useGlobalContext } from '../context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaTwitter, FaFilter } from 'react-icons/fa';

const QuoteBox = () => {
    const { quote, fetchQuote, openSidebar } = useGlobalContext();
    return (
        <section id='quote-box'>
            <figure>
                <blockquote className='blockquote text-center'>
                    <span id='text'>{quote.content}</span>
                </blockquote>
                <figcaption id='author' className='blockquote-footer text-end'>
                    {quote.author}
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
                            '"' + quote.quote + '" ' + quote.author
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
