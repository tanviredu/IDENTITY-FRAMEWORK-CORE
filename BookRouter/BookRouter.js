const BookRouter = require("express").Router();
const Book     = require("../Model/BookModel");
function router(nav){
    let books =[
        {
            title: "Gonzales",
            ganre: "male",
            author: "Araceli",
            read: true,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            title: "Coffey",
            ganre: "female",
            author: "Mcconnell",
            read: true,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            title: "Woodward",
            ganre: "male",
            author: "Downs",
            read: true,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            title: "Nguyen",
            ganre: "male",
            author: "Josefina",
            read: true,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            title: "Neal",
            ganre: "female",
            author: "Carr",
            read: true,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        }
    ]
    BookRouter.get("/",(req,res,next)=>{
        Book.find({})
            .then((books)=>{
                res.render("books",{
                    books:books,
                    nav:nav
                })
            },(err)=>{
                console.log(err);
            })
    })


    BookRouter.get("/:id",(req,res)=>{
        let id = req.params.id;
        Book.findById(id)
            .then((book)=>{
                res.render("bookView",{
                    book:book,
                    nav:nav
                })
            },(err)=>{
                console.log(err);
            })
    })

    return BookRouter;

}


module.exports = router;