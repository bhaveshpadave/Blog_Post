import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

var blogArray = 0;
var blogCount = 6;

//Object skeleton for new and edit blog
var newUrl, newTitle, newDescription;
const blogData = {
    url: newUrl,
    title: newTitle,
    description: newDescription
}

const blog1 = {
    url: "/blog1",
    title: "The apoclypse",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content. It was apoclypse experience",
    id: "blog1"
};
const blog2 = {
    url: "/blog2",
    title: "New Era",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content. The begining of advance future",
    id: "blog2"
};
const blog3 = {
    url: "/blog3",
    title: "Civil Wars",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content. The world is on the edge of war",
    id: "blog3"
};
const blog4 = {
    url: "/blog4",
    title: "The apoclypse",
    description: "It was apoclypse experience",
    id: "blog4"
};
const blog5 = {
    url: "/blog5",
    title: "New Era",
    description: "The begining of advance future",
    id: "blog5"
};
const blog6 = {
    url: "/blog6",
    title: "Civil Wars",
    description: "The world is on the edge of war",
    id: "blog6"
};

var allBlogs = [blog1, blog2, blog3, blog4, blog5, blog6];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Start of index.ejs 
app.get("/", (req,res) => {
    res.render("index.ejs", {
        blog: allBlogs,
        showBLogsFun: showAllBlogs()
    });
    
});

// Start of blog.ejs
function blog (array){
    blogArray = array;
    var array = Object.create(array);
    app.get(array.url, (req, res) => {
        res.render("blog.ejs", {
            url: array.url,
            title: array.title,
            description: array.description,
            id: array.id
        });
    });
}
// End of blog.ejs

function showAllBlogs(){
    allBlogs.forEach(e => {
        blog(e);
    });
}
// End of index.ejs

// Start of new_blog.ejs
app.get("/create-new-blog", (req, res) => {
    res.render("new_blog.ejs");
});

app.post("/create-new-blog", (req, res) => {
    blogCount++;
    res.render("new_blog.ejs", {
        // url: req.body.blogUrl,
        title: req.body.blogTitle,
        description: req.body.blogDescription
    });

    var arrayName = "blog" + blogCount;
    var urlgen = "/"+arrayName;

    arrayName = Object.create(blogData);

    arrayName.url = urlgen;
    arrayName.title = req.body.blogTitle;
    arrayName.description = req.body.blogDescription;
    arrayName.id = `${arrayName}`;

    allBlogs.push(arrayName);
    console.log(allBlogs[6].valueOf());

});
// End of new_blog.ejs

// Start of edit_blog.ejs
app.get("/edit-blog", (req, res) => {
        res.render("edit_blog.ejs", {
            blogUrl: blogArray.url,
            blogTitle: blogArray.title,
            blogDescription: blogArray.description
    });

});

app.post("/", (req, res) => {

    res.render("edit_blog.ejs", {
        title: req.body['newBlogTitle'],
        description: req.body['newBlogDescription'],
        blogTitle: req.body['newBlogTitle'],
        blogDescription: req.body['newBlogDescription']
    });

    blogArray.title = req.body.newBlogTitle;
    blogArray.description = req.body.newBlogDescription;

});
// End of edit_blog.ejs

// Start of remove blog
app.get("/remove-blog", (req, res) => {
    var i = allBlogs.indexOf(`${req.body.id}`);

    console.log(i);
    console.log(blogArray);

    allBlogs.splice(i,1);
    res.render("remove_blog.ejs");
});
// End of remove blog

//Console log to check the port
app.listen(PORT, (req, res) => {
    console.log(`Listening to ${PORT}`);
});