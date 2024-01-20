const uses = require("../data/uses-data");
const urls = require("../data/urls-data");

function list(req, res){
  const { urlId } = req.params;
  const matchUrl = uses.filter((use) => use.urlId === Number(urlId));
  if (urlId){
      res.status(200).json({ data: matchUrl});
  } else {
      res.status(200).json({ data: uses})
  }
}

function read(req, res){
  res.status(200).json({ data: res.locals.use });
}

function destroy(req, res){
  const index = uses.findIndex((use) => use.id === Number(res.locals.use.id));
  if (index > -1){
      uses.splice(index, 1);
  }
  res.sendStatus(204);
}

function validUse(req, res, next){
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse){
      res.locals.use = foundUse;
      return next();
  } else {
      next({
          status: 404,
          message: `Could not find use id: ${useId}`
      })
  }
}

module.exports = {
    list,
    read: [validUse, read],
    delete: [validUse, destroy]
};