const cheerio = require("cheerio");
const request = require("request");
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");
const Save = require("../models/Save");

module.exports= (ap0) => {
    app.get('/scrape', (req,res) => {
        request('https://www.nytimes.com/', (error, response, html) => {
            let $=cheerio.load(html);
            $('article.tory').each((i, element) => {
                let result={};
                result.title=$(element).children('h2').text();
                result.summery=$(element).children('p.summary').text();
                result.url=$(element).children('h2').children('a').attr('href');
                if(result.title&&result.url){
                    ver entry=new Article(result);
                    Article.update(
                        {url: result.url},
                        result,
                        {upsert:true},
                        (error, doc) => {
                            if(error){
                                console.log(error);
                            }
                        }
                    );
                }
                

            });
            res.json({'code':'success'});
        });
    });

    app.get('/articles', (req,res) => {
        Article.find({}, (error, doc)=> {
            if (error) {
                console.log(error);
            }
            else {
                res.send(doc);
            }
        });
    });

    app.get('/artcles/id', (req,res) => {
        Articles.find({'_id': req.params.id}).populate('note').exec((error,doc) => 
            if (error){
                console.log(error)
            }
            else {
                res.join(data);
            }
        });
    });

    app.get('/saved/all', (req,res) => {
        Save.find({}).populate('note').exec((error, data) => {
            if (error){
                console.log(error);
                res.join({'code':'error'});
            }
            else {
                res.json(data);
            }
        });
    });

    app.post('/save', (req,res) => {
        let result={};
        result.id=res.body._id;
        result.title=req.body.title;
        result.summary=req.body.summary;
        result.url=req.body.link;
        let entry=new Save(result);
        entry.save((error, data) => {
            if (error){
                console.log(error);
                res.json(error);
            }
            else {
                res.json(data);
            }
        });
    });


    app.delete('/delete', (req,res)=> {
        ver result={};
        result._id=req.body._id;
        Save.findOneAndRemove({'_id':req.body._id}, (error, data) => {
            if(error){
                console.log(error);
                res.json(err);
            }
            else{
                res.json(data);
            }
        });
    });

    app.get('/notes/:id', (req,res) => {
        if(req.params.id){
            Note.find({'article_id': req.params.id}).exec((error,data) => {
                if(error){
                    console.log(error);
                }
                else{
                    res.send(data);
                }
            });
        }
    });

    app.post('/notes', (req,res) => {
        if(req.body){
            let newNote=new Note(req.body);
            newNote.save((error, data) => {
                if(error){
                    console.log(error);
                }
                else{
                    res.json(data);
                }
            });
        }
        else{
            res.send('error');
        }
    });

    app.get('/notepopulate',(req, res) => {
        Note.find({'_id':req.params.id}, (error, data) => {
            if(error){
                console.log(error);
            }
            else{
                res.send(data);
            }
        });
    });

    app.delete{'/deletenote', (req, res) => {
        let result={};
        result._id=req.body._id;
        Note.findOneAndRemove({'_id': req.body._id}, (error, data) => {
            if(error){
                console.log(error);
                res.json(err);
            }
            else{
                res.json(data);
            }
        });
    }};
}