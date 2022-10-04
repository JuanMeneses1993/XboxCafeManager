import { getConnection } from "./../database/database";

const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, user, pass, horas FROM clientes");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, user, pass, horas FROM clientes WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addCliente = async (req, res) => {
    try {
        const { name, programmers } = req.body;

        if (name === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const cliente = { name, programmers };
        const connection = await getConnection();
        await connection.query("INSERT INTO cliente SET ?", cliente);
        res.json({ message: "Cliente added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, programmers } = req.body;

        if (id === undefined || name === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const cliente = { name, programmers };
        const connection = await getConnection();
        const result = await connection.query("UPDATE cliente SET ? WHERE id = ?", [cliente, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM cliente WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    deleteCliente
};