/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', {appTitle: 'appTitle'});
};

exports.planet = function (req, res) {
    res.render('planet', {appTitle: 'appTitle'});
};

exports.brands = function (req, res) {
    res.render('brands', {appTitle: 'appTitle'});
};

exports.commitments = function (req, res) {
    res.render('commitments', {appTitle: 'appTitle'});
};

exports.people = function (req, res) {
    res.render('people', {appTitle: 'appTitle'});
};

exports.pwp = function (req, res) {
    res.render('performance-with-purpose', {appTitle: 'appTitle'});
};

exports.perspectives = function (req, res) {
    res.render('perspectives', {appTitle: 'appTitle'});
};

exports.products = function (req, res) {
    res.render('products', {appTitle: 'appTitle'});
};

exports.recipes = function (req, res) {
    res.render('recipes', {appTitle: 'appTitle'});
};

exports.governance = function (req, res) {
    res.render('governance', {appTitle: 'appTitle'});
};

exports.governance_video = function (req, res) {
    res.render('governance_video', {appTitle: 'appTitle'});
};

exports.philanthropy = function (req, res) {
    res.render('philanthropy', {appTitle: 'appTitle'});
};