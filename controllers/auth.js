exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
        .get('Cookie')
        .split(';')[1]
        .trim()
        .split('=')[1] === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    // set a header 
    res.setHeader('Set-Cookie', 'loggedin=true');
    res.redirect('/');
}