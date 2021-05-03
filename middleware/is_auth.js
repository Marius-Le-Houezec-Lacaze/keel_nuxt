
export default (context) => {
    if (!context.app.context.app.$cookies.get('bearer')) {
        return context.redirect('/login')
    }
}
