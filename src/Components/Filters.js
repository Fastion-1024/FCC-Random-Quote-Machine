import { useGlobalContext } from '../context';
import Authors from './Authors';
import Tags from './Tags';
import { FaUndoAlt, FaCheck } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Filters = () => {
    const { sideBarHidden, closeSidebar, resetFilters, quoteCount } =
        useGlobalContext();

    return (
        <>
            <div
                className={`${
                    sideBarHidden ? 'modal-blur' : 'modal-blur show-modal-blur'
                }`}
            />
            <aside
                className={`${
                    sideBarHidden ? 'sidebar' : 'sidebar show-sidebar'
                }`}
            >
                <h2 className='sidebar-header'>Filters</h2>

                <Authors />
                <h3>Or</h3>
                <Tags />

                <h3 className='text-center'>Matching Quotes: {quoteCount} </h3>

                <Container className='d-flex justify-content-around filter-controls-container'>
                    <Button className='secondary-btn' onClick={resetFilters}>
                        <FaUndoAlt aria-hidden='true' focusable='false' />
                        <span className='visually-hidden'>Reset Filters</span>
                    </Button>
                    <Button className='secondary-btn' onClick={closeSidebar}>
                        <FaCheck aria-hidden='true' focusable='false' />
                        <span className='visually-hidden'>Close Filters</span>
                    </Button>
                </Container>
            </aside>
        </>
    );
};

export default Filters;
