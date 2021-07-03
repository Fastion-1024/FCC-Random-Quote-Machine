import { useGlobalContext } from '../context';
import Authors from './Authors';
import Tags from './Tags';
import { FaTimes } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Filters = () => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext();

    return (
        <>
            <div
                className={`${
                    isSidebarOpen ? 'modal-blur show-modal-blur' : 'modal-blur'
                }`}
            />
            {/* {isSidebarOpen && <div className='modal-blur' />} */}
            <aside
                className={`${
                    isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'
                }`}
            >
                <Container className='d-flex justify-content-between'>
                    <h2 className='sidebar-header'>Filters</h2>
                    <Button className='secondary-btn' onClick={closeSidebar}>
                        <FaTimes />
                    </Button>
                </Container>

                <Authors />
                <Tags />
            </aside>
        </>
    );
};

export default Filters;
