import isEqual from 'lodash/isEqual';

/** Logger for global stores. */
class Logger {
  private name: string
  private collapsed: boolean;
  private prevState: Record<string, any>;

  constructor(name: string, collapsed = true) {
    this.name = name;
    this.collapsed = collapsed;
    this.prevState = {};
  }

  private logDifference(state: Record<string, any>) {
    if (this.collapsed) {
      console.groupCollapsed('Difference');
    } else {
      console.group('Difference');
    }

    for (let prop in state) {
      if (!isEqual(this.prevState[prop], state[prop])) {
        console.log(`${prop}: ${JSON.stringify(this.prevState[prop])} => ${JSON.stringify(state[prop])}`)
      }
    }

    console.groupEnd();
    
    this.prevState = state;
  }

  public log(state: Record<string, any>) {
    const group = `Store ${this.name}`;
    if (this.collapsed) {
      console.groupCollapsed(group);
    } else {
      console.group(group);
    }

    console.log('Current state: ', state);

    this.logDifference(state);
    

    console.groupEnd();
  }
}

export default Logger;
