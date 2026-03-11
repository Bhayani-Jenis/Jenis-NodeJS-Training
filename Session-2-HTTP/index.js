const http = require('http')
const fs = require('fs/promises')
const path = require('path')

const file_path = path.join(__dirname, "db.json")


async function readData() {
    let data = await fs.readFile(file_path, 'utf-8')
    return JSON.parse(data)
}


async function writeData(data) {

    await fs.writeFile(file_path, JSON.stringify(data), 'utf-8')
}



async function readBody(req) {
    let b = ""
    for await (const c of req) {
        b += c
    }
    return b;
}



const server = http.createServer(async (req, res) => {
    const { url, method } = req
    // console.log(url,method);

    if (method === 'GET' && url === "/users") {
        let users = await readData();
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(users))
    }

    else if (method === "GET" && url.includes("/users/")) {
        const id = Number(url.split('/')[2])
        const users = await readData();
        const user = users.find(x => x.id === id)
        if (!user) {
            res.writeHead(404, { "content-type": "application/json" })
            return res.end(JSON.stringify({ message: "User Not Found" }))
        }
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(user))
    }

    else if (method === "POST" && url === '/users') {
        const bdata = await readBody(req)
        const data = JSON.parse(bdata)
        const users = await readData();
        data.id = users[users.length - 1].id + 1;
        users.push(data)
        await writeData(users)


        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "user created" }))
    }

    else if (method === "DELETE" && url.includes('/users/')) {
        const id = Number(url.split('/')[2])
        const users = await readData();
        const user = users.find(x => x.id == id)
        const newusers = users.filter(x => x.id != id)
        await writeData(newusers)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "user Deleted successfully", user: user }))
    }
    else if (method === "PUT" && url.includes("/users/")) {
        const id = Number(url.split('/')[2])
        const users = await readData();
        let body = await readBody(req)
        body = JSON.parse(body)
        const user = users.find(x => x.id == id)
        const index = users.indexOf(user)
        users[index] = { ...users[index], ...body }
        await writeData(users)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "user Data Changed", user: users[index] }))
    }


})

server.listen(3000, () => {
    console.log("server running on 3000 port");
})




