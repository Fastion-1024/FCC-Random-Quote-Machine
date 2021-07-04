import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import { actions } from './reducer';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
    loading: false,
    error: { hidden: true, message: '' },
    authors: [],
    selectedAuthor: '',
    tags: [],
    quote: { content: '', author: '' },
    sideBarHidden: true,
    filterByAuthor: false,
    filterByTags: false,
    quoteCount: 0,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchAuthors = async () => {
        dispatch({ type: actions.LOADING });

        try {
            // Setup variables to loop through API pages.
            // We will retrieve all authors from the API
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

            dispatch({ type: actions.DISPLAY_AUTHORS, payload: authors });
            dispatch({ type: actions.SELECT_FIRST_AUTHOR });
        } catch (error) {
            console.log(error);
            setError('Error When Fetching Authors!');
        }
    };

    const fetchTags = async () => {
        dispatch({ type: actions.LOADING });

        try {
            const response = await fetch('https://api.quotable.io/tags');
            const data = await response.json();

            const newTags = data.map((tag) => {
                const { _id, name, quoteCount } = tag;
                return { id: _id, name, quoteCount, checked: false };
            });

            dispatch({ type: actions.DISPLAY_TAGS, payload: newTags });
        } catch (error) {
            console.log(error);
            setError('Error When Fetching Tags!');
        }
    };

    const fetchQuote = async () => {
        let url = 'https://api.quotable.io/random';

        if (state.filterByAuthor) {
            if (state.selectedAuthor === '') {
                setError('Error:- No Author Selected!');
            }
            url += `?author=${state.selectedAuthor}`;
        } else if (state.filterByTags) {
            if (!state.tags.some((tag) => tag.checked)) {
                setError('Error:- No Tags Selected!');
            }
            url += `?tags=${state.tags.filter((tag) => tag.checked).join('|')}`;
        }

        dispatch({ type: actions.LOADING });

        try {
            const response = await fetch(url);
            const data = await response.json();
            const { content, author } = data;

            dispatch({
                type: actions.DISPLAY_QUOTE,
                payload: { content, author },
            });
        } catch (error) {
            console.log(error);
            setError('Error When Fetching Quote');
        }
    };

    const setError = (message) => {
        dispatch({ type: actions.ERROR, payload: message });
    };

    const openSidebar = () => {
        dispatch({ type: actions.SHOW_SIDEBAR });
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    const closeSidebar = () => {
        dispatch({ type: actions.HIDE_SIDEBAR });
    };

    const handleSelectedAuthorChange = (name) => {
        dispatch({ type: actions.UPDATE_SELECTED_AUTHOR, payload: name });
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    const handleSelectedTagsChange = (id) => {
        dispatch({ type: actions.TOGGLE_TAG, payload: id });
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    const toggleFilterByAuthor = () => {
        dispatch({ type: actions.TOGGLE_FILTER_BY_AUTHOR });
        if (state.filterByTags) {
            dispatch({ type: actions.TOGGLE_FILTER_BY_TAGS });
        }
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    const toggleFilterByTags = () => {
        dispatch({ type: actions.TOGGLE_FILTER_BY_TAGS });
        if (state.filterByAuthor) {
            dispatch({ type: actions.TOGGLE_FILTER_BY_AUTHOR });
        }
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    const resetFilters = () => {
        dispatch({ type: actions.RESET_FILTERS });
        dispatch({ type: actions.UPDATE_QUOTE_COUNT });
    };

    useEffect(() => {
        fetchAuthors();
        fetchTags();
        fetchQuote();
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                openSidebar,
                closeSidebar,
                handleSelectedAuthorChange,
                handleSelectedTagsChange,
                toggleFilterByAuthor,
                toggleFilterByTags,
                fetchQuote,
                resetFilters,
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
