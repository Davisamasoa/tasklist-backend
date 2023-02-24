const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ msg: "Api tasklist, by: Davi Samuel" });
});

module.exports = router;
