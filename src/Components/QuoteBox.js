import { useGlobalContext } from '../context';
import Button from 'react-bootstrap/Button';

const QuoteBox = () => {
    const { quote, fetchQuote } = useGlobalContext();
    return (
        <section id='quote-box'>
            <figure>
                <blockquote className='blockquote'>
                    <span id='text'>{quote.content}</span>
                </blockquote>
                <figcaption id='author' className='blockquote-footer'>
                    {quote.author}
                </figcaption>
            </figure>
            <Button id='new-quote' onClick={fetchQuote}>
                New Quote
            </Button>
            <Button
                id='tweet-quote'
                href={
                    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                    encodeURIComponent('"' + quote.quote + '" ' + quote.author)
                }
                target='_blank'
            >
                Tweet
            </Button>
        </section>
    );
};

export default QuoteBox;
