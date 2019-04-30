const path = require('path');
const fs = require('fs');
const DIRNAME = path.dirname(__filename);
module.exports = function(req, res) {
    const subpath = (req.originalUrl || req.url).replace(/^\/api\/|\?.*$/g, '');
    const jsonFile = subpath  + '.json';
    const jsFile = subpath + '.js';
    if (exist(jsFile)) {
        let file = require.resolve(path.join(DIRNAME, jsFile));
        delete require.cache[file];
        return require(file)(req, res);
    } if (exist(jsonFile)) {
        if (req.query.waitSeconds) {
            return setTimeout(function() {
                res.json(readJson(jsonFile));
            }, parseInt(req.query.waitSeconds, 10) * 1000);
        }
        return res.json(readJson(jsonFile));
    }
    res.json(readJson('notFound.json'));
}
function exist(subpath) {
    return fs.existsSync(path.join(DIRNAME, subpath));
}
function readJson(subpath) {
    const content = fs.readFileSync(path.join(DIRNAME, subpath), 'utf8');
    return JSON.parse(content);
}