const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const contactSchema = require("../validators/contact-validator");

const contactForm = require("../controllers/contact-controller");

router.route("/contactForm").post(validate(contactSchema),contactForm);

module.exports = router;