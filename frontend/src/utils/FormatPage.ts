const formatPageName = (page : string) : string => {
    return page.toLowerCase().replace(' ', '-');
};

export default formatPageName;