'use strict'

'use strict'

function parsePayload (payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString('utf8')
  }
  try {
    payload = payload.split("'").join('"')
    payload = JSON.parse(payload)
  } catch (err) {
    console.log(err)
    payload = null
  }

  return payload
}

function pipe (source, target) {
  if (!source.emit || !target.emit) {
    throw TypeError('Source and Target should be emmiters')
  }

  const emit = source._emit = source.emit
  source.emit = function () {
    emit.apply(source, arguments)
    target.emit.apply(target, arguments)
    return source
  }
}

module.exports={
    parsePayload,
    pipe
}