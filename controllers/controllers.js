const listPersonas = (req, res, next) => {
    res.render("personas", { title: "Lista", mensaje: "Lista de personas" });
}

module.exports = {
    listPersonas
}
