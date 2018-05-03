const path=require('path');

module.exports= (app) => {
    app.get('/', (req,res) => {
        res.sendFile(path.join(_dirname, 'views/index.html'));
    });
    app.get('saved/all', (req,res) => {
        res.sendFile(path.join(_dirname, 'views/saved.html'));
    });
    app.get('*', (req,res) => {
        res.sendFile(path.join(_dirname, 'views/index.html'));
    });
}