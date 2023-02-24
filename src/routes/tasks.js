const express = require("express");
const router = express.Router();
const TaskModel = require("../models/task");
const UserModel = require("../models/user");

const user = {
	email: "davisamasoa@gmail.com",
	id: "63f56db506a23c3589cf4e04",
};

router.get("/", async (req, res) => {
	try {
		const getTasks = await TaskModel.find({
			autor: {
				id: user.id,
			},
		});
		if (getTasks) {
			res.status(200).json(getTasks);
		} else {
			res.status(200);
		}
	} catch (error) {
		res.status(422).json({ msg: "Ocorreu algum erro ao buscar as tarefas!" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, author } = req.body;
		const findAuthorName = await UserModel.findById(author.id);

		const newTask = await TaskModel.create({ name, author: { ...author, name: findAuthorName.name } });
		newTask.save();

		const updateAuthorTaskArray = await UserModel.findById(author.id);
		updateAuthorTaskArray.tasks.push(newTask);

		updateAuthorTaskArray.save();

		res.status(200).json(newTask);
	} catch (error) {
		res.status(422).json({ msg: "Ocorreu algum erro ao criar a tarefa!" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deleteTask = await TaskModel.findById(req.params.id);

		const deleteTaskFromArrayUsers = await UserModel.findById(deleteTask.author.id);

		const indexOfTaskDelete = deleteTaskFromArrayUsers.tasks.indexOf(req.params.id);

		deleteTaskFromArrayUsers.tasks.splice(indexOfTaskDelete, 1);

		deleteTask.remove();

		deleteTaskFromArrayUsers.save();

		res.status(200).json({ msg: "Tarefa deletada com sucesso!" });
	} catch (error) {
		res.status(422).json({ msg: "Ocorreu algum erro ao deletar a tarefa!" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { name, done } = req.body;

		const editTask = await TaskModel.findByIdAndUpdate(req.params.id, {
			name,
			done,
		});

		res.status(200).json({ msg: "Edição bem sucedida!" });
	} catch (error) {
		res.status(422).json({ msg: "Não foi possível editar a tarefa!" });
	}
});

module.exports = router;
