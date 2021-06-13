import * as _ from 'lodash';

export default class Util {
    static uniqueID() {
        return Math.random().toString(36).substr(2, 9)
    }

    static empty(value) {
      return _.isEmpty(value);
    }
}
