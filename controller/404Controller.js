exports.getErrorPage = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: " " // stops the 404 page from complaining
    });
};