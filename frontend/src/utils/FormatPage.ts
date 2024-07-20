const formatPageName = (page : string) : string => {
    return page.toLowerCase().replace(' ', '_');
};

export default formatPageName;