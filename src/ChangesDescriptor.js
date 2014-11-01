/** Changes descriptor constructor.
 * @param {Binding} binding binding
 * @param {Array} path absolute changed path
 * @param {Array} listenerPath absolute listener path
 * @param {Immutable.Map} previousValue previous binding backing value
 * @param {Immutable.Map} previousMeta previous meta binding backing value
 * @public
 * @class ChangesDescriptor
 * @classdesc Encapsulates binding changes for binding listeners. */
var ChangesDescriptor =
  function (binding, path, listenerPath, previousValue, previousMeta) {
    /** @private */
    this._binding = binding;
    /** @private */
    this._path = path;
    /** @private */
    this._listenerPath = listenerPath;
    /** @private */
    this._previousValue = previousValue;
    /** @private */
    this._previousMeta = previousMeta;
  };

ChangesDescriptor.prototype = Object.freeze( /** @lends ChangesDescriptor.prototype */ {
  /** Get changed path relative to binding's path listener was installed on.
   * @return {Array} changed path */
  getPath: function () {
    var listenerPathLen = this._listenerPath.length;
    return listenerPathLen === this._path.length ? [] : this._path.slice(listenerPathLen);
  },

  /** Check if binding's value was changed.
   * @returns {Boolean} */
  isValueChanged: function () {
    return !!this._previousValue &&
      this._binding.get(this._listenerPath) !== this._previousValue.getIn(this._listenerPath);
  },

  /** Check if meta binding's value was changed.
   * @returns {Boolean} */
  isMetaChanged: function () {
    return !!this._previousMeta;
  },

  /** Get previous value at listening path.
   * @returns {*} previous value at listening path or null if not changed */
  getPreviousValue: function () {
    return this._previousValue && this._previousValue.getIn(this._listenerPath);
  },

  /** Get previous meta at listening path.
   * @returns {*} */
  getPreviousMeta: function () {
    return this._previousMeta;
  }
});

module.exports = ChangesDescriptor;