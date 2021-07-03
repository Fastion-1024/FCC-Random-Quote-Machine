import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        author: '',
        tags: [],
        filterByAuthor: false,
        filterByTags: false,
    });
    const [quote, setQuote] = useState({ content: '', author: '' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchAuthors = async () => {
        setLoading(true);

        try {
            // Setup variables for getting all results.
            let fetchPage = 1;
            let authors = [];
            let lastPage = false;
            let limit = 100;

            while (!lastPage) {
                const response = await fetch(
                    `https://api.quotable.io/authors?limit=${limit}&page=${fetchPage}`
                );
                const data = await response.json();

                const newAuthors = data.results.map((author) => {
                    const { _id, name, description, bio, quoteCount } = author;
                    return { id: _id, name, description, bio, quoteCount };
                });

                authors = [...authors, ...newAuthors];

                data.page === data.totalPages ? (lastPage = true) : fetchPage++;
            }

            setAuthors(authors);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        setLoading(true);

        try {
            const response = await fetch('https://api.quotable.io/tags');
            const data = await response.json();

            const newTags = data.map((tag) => {
                const { _id, name, quoteCount } = tag;
                return { id: _id, name, quoteCount };
            });

            setTags(newTags);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchQuote = async () => {
        let url = 'https://api.quotable.io/random';

        if (filters.filterByAuthor && filters.filterByTags) {
            if (filters.author === '') {
                console.log('Error:- No Author Selected!');
            } else if (filters.tags.length === 0) {
                console.log('Error:- No Tags Selected!');
            } else {
                url += `?author=${filters.author}&tags=${filters.tags.join(
                    '|'
                )}`;
            }
        } else if (filters.filterByAuthor && filters.author !== '') {
            url += `?author=${filters.author}`;
        } else if (filters.filterByTags && filters.tags.length > 0) {
            url += `?tags=${filters.tags.join('|')}`;
        }

        setLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();
            const { content, author } = data;

            setQuote({ content, author });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleAuthorFilterChange = (author) => {
        setFilters({ ...filters, author });
    };

    const handleTagsFilterChange = (tag) => {
        if (filters.tags.includes(tag)) {
            const newTags = filters.tags.filter((item) => item !== tag);
            setFilters({ ...filters, tags: newTags });
        } else {
            const newTags = [...filters.tags, tag];
            setFilters({ ...filters, tags: newTags });
        }
    };

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        fetchAuthors();
        fetchTags();
        fetchQuote();
    }, []);

    return (
        <AppContext.Provider
            value={{
                loading,
                authors,
                tags,
                filters,
                setFilters,
                quote,
                handleAuthorFilterChange,
                handleTagsFilterChange,
                fetchQuote,
                isSidebarOpen,
                openSidebar,
                closeSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
