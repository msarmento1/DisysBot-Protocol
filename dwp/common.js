const SlaveState = {
  EXECUTING: 0,
  PAUSED: 1
};

const Flags = {
  RESOURCE: (1 << 0),
  TASKS: (1 << 1),
  STATE: (1 << 2),
  ALIAS: (1 << 3),
  SUPPORTED_LANGUAGES: (1 << 4),
};

const TerminateTaskCode = {
  TERMINATED: 0,
  DENIED: 1
};

module.exports.SlaveState = SlaveState;
module.exports.Flags = Flags;
module.exports.TerminateTaskCode = TerminateTaskCode;
