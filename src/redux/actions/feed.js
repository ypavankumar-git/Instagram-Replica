export const setFeeds = (feeds) => ({
    type: 'setFeeds',
    payload: feeds
});

export const clearFeeds = () => ({
    type: 'clearFeeds',
    payload: null
});