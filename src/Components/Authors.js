import { useState } from 'react';
import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';

const Authors = () => {
    const { authors, handleAuthorFilterChange } = useGlobalContext();
    const [char, setChar] = useState('A');
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
        <Form>
            <Form.Group controlId='formAlphaSelect'>
                <Form.Label>Filter By Author:</Form.Label>
                <Form.Control
                    as='select'
                    className='form-select'
                    onChange={(e) => setChar(e.target.value)}
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
                    onChange={(e) => handleAuthorFilterChange(e.target.value)}
                >
                    {authors
                        .filter((author) => author.name.charAt(0) === char)
                        .map((author) => {
                            const { id, name, quoteCount } = author;
                            return (
                                <option key={id} value={name}>
                                    {name} - {quoteCount}
                                </option>
                            );
                        })}
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default Authors;
