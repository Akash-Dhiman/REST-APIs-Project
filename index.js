const fs = require('fs');
const http = require('http');


// Reading File Async.
let readData;
fs.readFile('./data.json', "utf-8", (err, result) => {
    readData = JSON.parse(result);
});

// Reading File Sync
let indexFile = fs.readFileSync("./index.html", "utf-8");
let formFile = fs.readFileSync("./form.html", "utf-8");


// Here Is Creating Server With Http Method.
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/products') && req.method == 'GET') {
        let productIndex = req.url.split('/')[2] === "" ? 1 : req.url.split('/')[2];
        // let firstProduct = readData.products[productIndex];
        let firstProduct = readData.products.find((x) => x.id == productIndex);
        let dynamicUpdateFile = indexFile.replace("**heading**", firstProduct.title)
            .replace("**image**", firstProduct.images[0])
            .replace("**name**", firstProduct.brand)
            .replace("**job**", firstProduct.category)
        res.setHeader('Content-Type', "text/html").end(dynamicUpdateFile);
        return
    }
    else if(req.url.startsWith('/products') && req.method == "POST"){
        res.end(formFile)
        return
    }

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', "application/json").end(JSON.stringify(readData));
            break;
        case "/product":
            res.setHeader('Content-Type', "text/html").end(`<h1>This Is Me</h1>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus repellat repellendus rerum voluptas exercitationem
                    amet neque minima. Vitae, rerum voluptatibus repellendus consectetur sequi officia minima culpa autem. Aliquid dolores,
                    hic minus possimus fugiat praesentium at eaque quaerat omnis dicta sequi officia alias eius ducimus molestiae quibusdam,
                    sit dolore inventore! Non.</p>
                </div>
            `);
            break;
        default:
            res.writeHead(404, 'NT Found').end();
    }
});

// Here Is Listening Server
server.listen(8080, () => {
    console.log("Server Listen");
});


