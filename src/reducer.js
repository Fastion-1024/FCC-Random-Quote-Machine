export const actions = {
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    DISPLAY_AUTHORS: 'DISPLAY_AUTHORS',
    DISPLAY_TAGS: 'DISPLAY_TAGS',
    DISPLAY_QUOTE: 'DISPLAY_QUOTE',
    SHOW_SIDEBAR: 'SHOW_SIDEBAR',
    HIDE_SIDEBAR: 'HIDE_SIDEBAR',
    UPDATE_SELECTED_AUTHOR: 'UPDATE_SELECTED_AUTHOR',
    SELECT_FIRST_AUTHOR: 'SELECT_FIRST_AUTHOR',
    TOGGLE_TAG: 'TOGGLE_TAG',
    TOGGLE_FILTER_BY_AUTHOR: 'TOGGLE_FILTER_BY_AUTHOR',
    TOGGLE_FILTER_BY_TAGS: 'TOGGLE_FILTER_BY_TAGS',
    RESET_FILTERS: 'RESET_FILTERS',
    UPDATE_QUOTE_COUNT: 'UPDATE_QUOTE_COUNT',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.LOADING:
            return { ...state, loading: true };

        case actions.ERROR:
            return {
                ...state,
                error: { hidden: false, message: action.payload },
            };

        case actions.DISPLAY_AUTHORS:
            return {
                ...state,
                authors: action.payload,
                loading: false,
            };

        case actions.DISPLAY_TAGS:
            return {
                ...state,
                tags: action.payload,
                loading: false,
            };

        case actions.DISPLAY_QUOTE:
            return {
                ...state,
                quote: action.payload,
                loading: false,
            };

        case actions.SHOW_SIDEBAR:
            return {
                ...state,
                sideBarHidden: false,
            };

        case actions.HIDE_SIDEBAR:
            return {
                ...state,
                sideBarHidden: true,
            };

        case actions.UPDATE_SELECTED_AUTHOR:
            return {
                ...state,
                selectedAuthor: action.payload,
            };

        case actions.SELECT_FIRST_AUTHOR:
            return {
                ...state,
                selectedAuthor: state.authors[0].name,
            };

        case actions.TOGGLE_TAG:
            const newTags = state.tags.map((tag) => {
                if (tag.id === action.payload) {
                    const { id, name, quoteCount, checked } = tag;
                    return { id, name, quoteCount, checked: !checked };
                }
                return tag;
            });

            return {
                ...state,
                tags: newTags,
            };

        case actions.TOGGLE_FILTER_BY_AUTHOR:
            return {
                ...state,
                filterByAuthor: !state.filterByAuthor,
            };

        case actions.TOGGLE_FILTER_BY_TAGS:
            if (!state.filterByTags === false) {
                const newTags = [...state.tags];
                newTags.forEach((tag) => (tag.checked = false));
                return {
                    ...state,
                    filterByTags: !state.filterByTags,
                    tags: newTags,
                };
            }
            return {
                ...state,
                filterByTags: !state.filterByTags,
            };

        case actions.RESET_FILTERS:
            return {
                ...state,
                filterByAuthor: false,
                filterByTags: false,
                selectedAuthor: state.authors[0].name,
                tags: state.tags.map((tag) => {
                    const { id, name, quoteCount } = tag;
                    return { id, name, quoteCount, checked: false };
                }),
                sideBarHidden: true,
            };

        case actions.UPDATE_QUOTE_COUNT:
            let total = 0;

            if (state.filterByAuthor) {
                total = state.authors.find(
                    (author) => author.name === state.selectedAuthor
                ).quoteCount;
            } else if (state.filterByTags) {
                total = state.tags
                    .filter((tag) => tag.checked)
                    .reduce((sum, tag) => {
                        return (sum += tag.quoteCount);
                    }, 0);
            } else {
                total = state.tags.reduce((sum, tag) => {
                    return (sum += tag.quoteCount);
                }, 0);
            }

            return {
                ...state,
                quoteCount: total,
            };

        default:
            throw new Error('No matching action found!');
    }
};

export default reducer;
