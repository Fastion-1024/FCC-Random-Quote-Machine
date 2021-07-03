import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';

const Tags = () => {
    const { tags, handleTagsFilterChange } = useGlobalContext();
    return (
        <Form>
            <Form.Group controlId='formTags'>
                <Form.Label className='sidebar-header'>
                    Filter By Tags:
                </Form.Label>
                {tags.map((tag) => {
                    const { id, name, quoteCount } = tag;
                    return (
                        <Form.Check
                            key={id}
                            id={id}
                            type='checkbox'
                            className='form-switch'
                            value={name}
                            label={`${name} - ${quoteCount}`}
                            onChange={(e) =>
                                handleTagsFilterChange(e.target.value)
                            }
                        />
                    );
                })}
            </Form.Group>
        </Form>
    );
};

export default Tags;
