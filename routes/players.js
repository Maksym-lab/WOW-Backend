var express = require('express');
const playersTable = require('../tables/players')
var router = express.Router();
router.get('/', (req, res) => {
  const params = req.query
  const { id } = params
  const { firstName } = params
  const { lastName } = params
  const { nickName } = params
  if (id) {
    try {
      const idInt = Number.parseInt(id)
      const result = playersTable.findById(idInt)
      if (result) {
        return res.status(200).send(result)
      }
      return res.status(404).send('404 not found')
    } catch (err) {
      return res.status(400).send('400 bad requst:' + err)
    }
  } else if(firstName || lastName || nickName) {
    return res.status(200).send('findByFirstNameLastNameNicknName()')
  } else {
    return res.status(200).send('findAll()')
  }
  return res.status(500).send()
});
router.get('/:id', (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const result = playersTable.findById(id)
    if (result) {
      return res.status(200).send(result)
    }
    return res.status(404).send('404 not found')
  } catch (err) {
    return res.status(400).send('400 bad requst:' + err)
  }
})
module.exports = router;
