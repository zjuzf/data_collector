Sequence = function (actions = [], time = {'start': new Time(), 'end': new Time()}) {
    this.actions = actions
    this.time = time
}

Time = function (min = 0, sec = 0){
    this.min = min
    this.sec = sec
}

Action = function (time = new Time(), x = 0, y = 0, pid = 0, eid = 0, qualifiers = []) {
    this.time = time
    this.x = x
    this.y = y
    this.pid = pid
    this.eid = eid
    this.qualifiers = qualifiers
}

Qualifier = function (qid = 0, value = 0) {
    this.qid = qid
    this.value = value
}