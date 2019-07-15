
__inline('./customer.db.js');

module.exports = function(req, res) {
    let ret;

    if (req.method === 'GET') {
        ret = db.index(req.query.page ? parseInt(req.query.page, 10) : 1, 10);
    }


    res.json({
        status: 0,
        data: ret
    })
}