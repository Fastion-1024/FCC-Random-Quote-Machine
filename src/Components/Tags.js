import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';

const Tags = () => {
    const { tags, handleSelectedTagsChange, filterByTags, toggleFilterByTags } =
        useGlobalContext();

    return (
        <Form>
            <Form.Check
                checked={filterByTags}
                onChange={toggleFilterByTags}
                label='Filter By Tags:'
                className='form-switch'
            />
            <Form.Group controlId='formTags'>
                {tags.map((tag) => {
                    const { id, name } = tag;
                    return (
                        <Form.Check
                            key={id}
                            id={id}
                            type='checkbox'
                            label={name}
                            checked={tag.checked}
                            onChange={(e) =>
                                handleSelectedTagsChange(e.target.id)
                            }
                            disabled={!filterByTags}
                        />
                    );
                })}
            </Form.Group>
        </Form>
    );
};

export default Tags;
