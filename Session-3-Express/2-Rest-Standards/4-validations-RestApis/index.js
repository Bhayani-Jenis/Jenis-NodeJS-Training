const express = require('express');
const app = express();
app.use(express.json());
let users = [];

function validateUser(body) {
    const errors = [];
    // TODO: check missing name
    if (!body.name) {
        errors.push({ error: { message: "Name field is required", StatusCode: 400 } })
    }
    // TODO: check blank name (whitespace only)
    if (body.name && body.name.trim() == '') {
        errors.push({ error: { message: "Name should contains chracter or numbers", StatusCode: 422 } })
    }
    // TODO: check missing email
    if (!body.email) {
        errors.push({ error: { message: "email field is required", StatusCode: 400 } })
    }
    // TODO: check invalid email (no '@')
    if (body.email && !body.email.includes('@')) {
        errors.push({ error: { message: "email format should contain @", StatusCode: 422 } })
    }
    return errors;
}

app.post('/api/users', (req, res) => {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
        // TODO: pick the right status code and respond
        return res.status(errors[0].error.StatusCode).json(errors[0])
    }
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json({ data: user });
});

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
});
