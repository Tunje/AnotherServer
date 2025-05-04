import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "User API",
        },
    },
    apis: ["./server.js"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Gets all users
 *     description: Retrieves a list of all users in the system
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get("/users", (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User created successfully
 */
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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
app.delete("/users/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    users = users.filter(u => u.id !== userid);
    res.json({message:"User deleted successfully"})
});