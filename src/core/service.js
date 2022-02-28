class Service {
  store = [{}];
  indexCommit = 0;
  indexRollback = 0;

  get vStore() {
    return this.store[this.indexRollback];
  }

  setValue = (name, value) => {
    this.vStore[name] = value;
  };

  getValue = (name) => {
    const value = this.vStore[name];
    console.log(value);
    return value;
  };

  unsetValue = (name) => {
    delete this.vStore[name];
  };

  numEqualTo = (value) => {
    const count = Object.values(this.vStore).reduce((prevValue, currValue) => {
      if (value === currValue) return prevValue + 1;
      return prevValue;
    }, 0);
    console.log(count);
    return count;
  };

  begin = () => {
    this.store.push({ ...this.store[this.indexRollback] });
    this.indexRollback += 1;
    return this;
  };

  commit = () => {
    this.store[this.indexCommit] = this.store[this.indexRollback];
    this.store.splice(this.indexCommit + 1);

    this.resetIndex();
    return this;
  };

  rollback = () => {
    if (this.indexRollback <= this.indexCommit) return;
    this.store.splice(this.indexRollback);
    this.indexRollback -= 1;

    return this;
  };

  resetIndex = () => {
    this.indexRollback = this.indexCommit;
  };

  parseCommand(cmd, args = []) {
    const commands = {
      BEGIN: this.begin,
      SET: this.setValue,
      GET: this.getValue,
      UNSET: this.unsetValue,
      NUMEQUALTO: this.numEqualTo,
      COMMIT: this.commit,
      ROLLBACK: this.rollback,
      STATUS: this.status,
    };

    return (commands[cmd] || (() => console.log('Not implemented')))(...args);
  }

  status = () => {
    console.log('*** STATUS *** ');
    console.log('STORE', this.store);
    console.log('INDEX', this.indexCommit, this.indexRollback);
  };
}

export default Service;
