import express from "express";

const app = express();

app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

let users = [


    {
        id: 1, name: "Steve Stevensson", email: "steve.stevenson@example.com", age: 30,
    },
    {
        id: 2, name: "John Jones", email: "john.jones@example.com", age: 25,
    },
    {
        id: 3, name: "Clark Kent", email: "clark.kent@example.com", age: 28,
    },
    {
        id: 4, name: "Barry Allen", email: "barry.allen@example.com", age: 28,
    },
    {
        id: 5, name: "Bruce Wayne", email: "bruce.wayne@example.com", age: 28,
    },
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const newUser = {
   id: users.length + 1,
   name: req.body.name,
   email: req.body.email,
   age: req.body.age
    };
    users.push(newUser);
    res.json({message: "User created successfully", user: newUser});
});

app.put("/users/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    const user = users.find(u => u.id === userid);
    if(!user){
        return(res.status(404).json({message:"User not found"}))
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    res.json({message:"User updated successfully", user})
});

app.delete("/users/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    users = users.filter(u => u.id !== userid);
    res.json({message:"User deleted successfully"})
});