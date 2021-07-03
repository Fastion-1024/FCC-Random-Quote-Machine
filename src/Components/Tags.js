import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';

const Tags = () => {
    const { tags, handleTagsFilterChange, filters, setFilters } =
        useGlobalContext();
    return (
        <Form>
            <Form.Check
                checked={filters.filterByTags}
                onChange={(e) =>
                    setFilters({ ...filters, filterByTags: e.target.value })
                }
                label='Filter By Tags:'
                className='form-switch'
            />
            <Form.Group controlId='formTags'>
                {tags.map((tag) => {
                    const { id, name, quoteCount } = tag;
                    return (
                        <Form.Check
                            key={id}
                            id={id}
                            type='checkbox'
                            value={name}
                            label={`${name} - ${quoteCount}`}
                            onChange={(e) =>
                                handleTagsFilterChange(e.target.value)
                            }
                            disabled={!filters.filterByTags}
                        />
                    );
                })}
            </Form.Group>
        </Form>
    );
};

export default Tags;
