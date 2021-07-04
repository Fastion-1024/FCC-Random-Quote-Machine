import { useState } from 'react';
import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';

const Authors = () => {
    const {
        authors,
        selectedAuthor,
        handleSelectedAuthorChange,
        filterByAuthor,
        toggleFilterByAuthor,
    } = useGlobalContext();
    const [char, setChar] = useState('A');
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
        <Form>
            <Form.Check
                checked={filterByAuthor}
                onChange={toggleFilterByAuthor}
                label='Filter By Author:'
                className='form-switch'
            />
            <Form.Group controlId='formAlphaSelect'>
                <Form.Control
                    as='select'
                    className='form-select'
                    onChange={(e) => setChar(e.target.value)}
                    disabled={!filterByAuthor}
                >
                    {alpha.split('').map((char, index) => {
                        return <option key={index}>{char}</option>;
                    })}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='formAuthors'>
                <Form.Control
                    as='select'
                    className='form-select'
                    onChange={(e) => handleSelectedAuthorChange(e.target.value)}
                    value={selectedAuthor}
                    disabled={!filterByAuthor}
                >
                    {authors
                        .filter((author) => author.name.charAt(0) === char)
                        .map((author) => {
                            const { id, name, quoteCount } = author;
                            return (
                                <option key={id} value={name}>
                                    {name}
                                </option>
                            );
                        })}
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default Authors;
