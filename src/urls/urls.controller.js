const uses = require("../data/uses-data");
const urls = require("../data/urls-data");

function list(req, res){
  res.status(200).json({ data: urls})
}

function create(req, res){
  const { data: { href }} = req.body;
  const newUrl = {
      id: urls.length + 1,
      href,
  }
  urls.push(newUrl),
  res.status(201).json({ data: newUrl })
}

function read(req, res){
  const newUse = {
      id: uses.length + 1,
      urlId: res.locals.url.id,
      time: Date.now()
  };
  uses.push(newUse);
  res.status(200).json({ data: res.locals.url})
}

function update(req, res){
  const { data: { href } } = req.body;
  res.locals.url.href = href;
  res.status(200).json({ data: res.locals.url });
}

function validateUrl(req, res, next){
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl){
      res.locals.url = foundUrl;
      return next();
  } else{
      next({
          status: 404,
          message: `Could not find url id: ${urlId}`
      })
  }
}

function hasValidInfo(req, res, next){
  const { data: { href }} = req.body;
  if(href){
      next();
  } else{
      next({
          status: 400,
          message: "Please add an 'href' property",
      })
  }
}


module.exports = {
    list,
    create: [hasValidInfo, create],
    read: [validateUrl, read],
    update: [validateUrl, hasValidInfo, update],
    validateUrl
};