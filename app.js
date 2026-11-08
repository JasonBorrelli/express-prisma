import express from "express";
const app = express();
const port = 3000;
import booksRouter from "./routers/books.js";
import errorsHendler from "./middleware/errorsHendler.js";
import notFound from "./middleware/notFound.js";


app.get('/', (req, res) => {
    res.send('this is the shop homepage test');
});

app.use('/books', booksRouter);


app.use(errorsHendler);
app.use(notFound);

app.listen(port, () => 
    console.log('server started on http://localhost:' + port),
);
