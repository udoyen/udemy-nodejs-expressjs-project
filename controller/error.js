exports.getErrorPage = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: "/404" // stops the 404 page from complaining
    });
};