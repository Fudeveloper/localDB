'use strict'

Where = require('./where')
Utils = require('./utils')
Projection = require('./projection')

Operation = {}

Operation.insert = (data, rowData, options) ->
    if Utils.isArray(rowData)
        for d in rowData when Utils.isObject(d)
            d._id = Utils.createObjectId() if not d._id?
            data.push d
    else if Utils.isObject(rowData)
        rowData._id = Utils.createObjectId() if not rowData._id?
        data.push rowData
    return data

Operation.update = (data, actions, options) ->
    where = options.where or {}
    multi = options.multi or false
    upsert = options.upsert or false
    for action, value of actions
        data = Update.generate data, action, value, where, multi, upsert
    return data

Operation.remove = (data, options) ->
    where = options.where or {}
    multi = options.multi or false
    result = []
    flag = false
    for d in data
        if flag
            result.push d
            continue
        if Where(d, where)
            flag = true if multi
            continue
        result.push d
    return result

Operation.find = (data, options) ->
    where = options.where or {}
    projection = options.projection or {}
    limit = options.limit or -1
    result = []
    for d in data when Where(d, where)
        break if limit is 0
        limit -= 1
        result.push d
    return Projection.generate(result, projection)

Update = {
    isKeyReserved: (key) -> key in ['$inc', '$set', '$mul', '$rename', '$unset', '$max', '$min']
    generate: (data, action, value, where, multi, upsert) ->
        return data if not Update.isKeyReserved(action)
        for k, v of value
            for d in data when Where(d, where)
                flag = false
                while k.indexOf(".") > 0
                    firstKey = k.split(".")[0]
                    d = d[firstKey]
                    if not d? and not upsert
                        flag = true
                        break
                    d = d or {} if upsert
                    k = k.substr(k.indexOf(".") + 1)
                continue if flag
                switch action
                    when "$inc" then d[k] += v
                    when "$set" then d[k] = v
                    when "$mul" then d[k] *= v
                    when "$rename"
                        d[v] = d[k]
                        delete d[k]
                    when "$unset"
                        delete d[k]
                    when "$min" then d[k] = Math.min(d[k], v)
                    when "$max" then d[k] = Math.max(d[k], v)
                break if not multi
        return data
}

module.exports = Operation