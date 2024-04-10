import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

const allBlogs = [{
    url: "/blog1",
    title: "How to Get New Ideas",
    description: "The way to get new ideas is to notice anomalies: what seems strange, or missing, or broken? You can see anomalies in everyday life (much of standup comedy is based on this), but the best place to look for them is at the frontiers of knowledge. Knowledge grows fractally. From a distance its edges look smooth, but when you learn enough to get close to one, you'll notice it's full of gaps. These gaps will seem obvious; it will seem inexplicable that no one has tried x or wondered about y. In the best case, exploring such gaps yields whole new fractal buds.",
    id: "blog1"
},
{
    url: "/blog2",
    title: "An NFT That Saves Lives",
    description: "Noora Health, a nonprofit I've supported for years, just launched a new NFT. It has a dramatic name, Save Thousands of Lives, because that's what the proceeds will do. Noora has been saving lives for 7 years. They run programs in hospitals in South Asia to teach new mothers how to take care of their babies once they get home. They're in 165 hospitals now. And because they know the numbers before and after they start at a new hospital, they can measure the impact they have. It is massive. For every 1000 live births, they save 9 babies.",
    id: "blog2"
},
{
    url: "/blog3",
    title: "Two Types",
    description: "I think you only need two kinds of people to create a technology hub: rich people and nerds. They're the limiting reagents in the reaction that produces startups, because they're the only ones present when startups get started. Everyone else will move. Observation bears this out: within the US, towns have become startup hubs if and only if they have both rich people and nerds. Few startups happen in Miami, for example, because although it's full of rich people, it has few nerds. It's not the kind of place nerds like.",
    id: "blog3"
},
// {
//     url: "/blog4",
//     title: "The apoclypse",
//     description: "It was apoclypse experience",
//     id: "blog4"
// },
// {
//     url: "/blog5",
//     title: "New Era",
//     description: "The begining of advance future",
//     id: "blog5"
// },
// {
//     url: "/blog6",
//     title: "Civil Wars",
//     description: "The world is on the edge of war",
//     id: "blog6"
// }
];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Show all blog posts
app.get("/", (req,res) => {
    res.render("index.ejs", {
        blog: allBlogs,
    });
    
});

// Read a blog post
app.get("/blog/:id", (req, res) => {
    const i =  allBlogs.findIndex((e)=> e.id === req.params.id);
    const array = allBlogs[i];
    res.render("blog.ejs", {
        blog: array,
    });
});

// Create new blog post
app.get("/create-new-blog", (req, res) => {
    res.render("new_blog.ejs");
});
app.post("/create-new-blog", (req, res) => {
    let arrayName = "blog" + (allBlogs.length+1);
    var urlgen = "/" + arrayName;

    let blogArray = {
        url: `${urlgen}`,
        title: req.body.blogTitle,
        description: req.body.blogDescription,
        id: `${arrayName}`
    }

    allBlogs.push(blogArray);

    res.redirect("/");
});

// Edit/ update existing blog post
app.get("/blog/edit/:id", (req, res) => {
    const i =  allBlogs.findIndex((e)=> e.id === req.params.id);
    const array = allBlogs[i];
        res.render("edit_blog.ejs", {
            blogId: req.params.id,
            blogUrl: array.url,
            blogTitle: array.title,
            blogDescription: array.description
    });
});
app.post("/blog/edit/:id", (req, res) => {
    const i =  allBlogs.findIndex((e)=> e.id === req.params.id);
    const array = allBlogs[i];
    array.title = req.body.newBlogTitle;
    array.description = req.body.newBlogDescription;
    res.redirect("/");
});

// Remove a blog post
app.get("/remove/:id", (req, res) => {
    const i =  allBlogs.findIndex((e)=> e.id === req.params.id);
    allBlogs.splice(i,1);
    res.render("remove_blog.ejs");
});


//Console log to check the port
app.listen(PORT, (req, res) => {
    console.log(`Listening to ${PORT}`);
});