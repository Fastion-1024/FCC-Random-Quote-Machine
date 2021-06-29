import { useState } from 'react';
import { useGlobalContext } from '../context';
import Form from 'react-bootstrap/Form';
import Authors from './Authors';
import Tags from './Tags';

const Filters = () => {
    return (
        <aside>
            <Authors />
            <Tags />
        </aside>
    );
};

export default Filters;
