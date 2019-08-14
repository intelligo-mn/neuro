"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _svm = require("svm");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvmJs = function SvmJs(opts) {
  _classCallCheck(this, SvmJs);

  this.base = new _svm.SVM();
  this.opts = opts; // options for SvmJsBase.train
};

SvmJs.prototype = {
  trainOnline: function trainOnline(features, label) {
    throw new Error("svm.js does not support online training");
  },
  trainBatch: function trainBatch(dataset) {
    var data = [];
    var labels = [];
    dataset.forEach(function (datum) {
      data.push(datum.input);
      labels.push(datum.output > 0 ? 1 : -1);
    });
    return this.base.train(data, labels, this.opts);
  },

  /**
   * @param features - a feature-value hash.
   * @param explain - int - if positive, an "explanation" field, with the given length, will be added to the result.
   * @param continuous_output if true, return the net classification score. If false [default], return 0 or 1.
   * @return the binary classification - 0 or 1.
   */
  classify: function classify(features, explain, continuous_output) {
    var score = this.base.marginOne(features);
    var classification = continuous_output ? score : score > 0 ? 1 : 0;

    if (explain > 0) {
      var f = this.base.b; // if the linear kernel was used and w was computed and stored,
      // (i.e. the svm has fully finished training)
      // the internal class variable usew_ will be set to true.

      var explanations = [];

      if (this.base.usew_) {
        var w = this.base.w;

        for (var j = 0; j < this.base.D; j++) {
          explanations[j] = {
            feature: j,
            value: features[j],
            weight: w[j],
            relevance: features[j] * w[j]
          };
        }
      } else {// explanations not supported.
        //for(var i=0;i<this.N;i++) {
        // f += this.alpha[i] * this.labels[i] * this.kernel(inst, this.data[i]);
        //}
      }

      explanations.sort(function (a, b) {
        return b.relevance - a.relevance;
      });
      return {
        classification: classification,
        explanation: explanations.slice(0, explain)
      };
    } else {
      return classification;
    }
  },
  toJSON: function toJSON() {
    return this.base.toJSON();
  },
  fromJSON: function fromJSON(json) {
    this.base.fromJSON(json);
  }
};
var _default = SvmJs;
exports["default"] = _default;