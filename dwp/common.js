
const WorkerState = {
  EXECUTING: 0,
  PAUSED: 1
}

const Flags = {
  RESOURCE: 0x01,
  TASKS: 0x02,
  STATE: 0x04,
  ALIAS: 0x08,
  SUPPORTED_LANGUAGES: 0x10
}

const TerminateTaskCode = {
  TERMINATED: 0,
  DENIED: 1
}

module.exports.WorkerState = WorkerState
module.exports.Flags = Flags
module.exports.TerminateTaskCode = TerminateTaskCode
