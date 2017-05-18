'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clusterize = require('clusterize.js/clusterize.js');

var _clusterize2 = _interopRequireDefault(_clusterize);

require('clusterize.js/clusterize.css');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transfer = function (_React$Component) {
  _inherits(Transfer, _React$Component);

  function Transfer(props) {
    _classCallCheck(this, Transfer);

    var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

    _this.initTransfer = _this.initTransfer.bind(_this);
    return _this;
  }

  _createClass(Transfer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initTransfer(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!_ramda2.default.equals(nextProps, this.props)) {
        console.info(nextProps);
        this.initTransfer(nextProps);
      }
    }
  }, {
    key: 'initTransfer',
    value: function initTransfer(props) {
      // const data = ['<div>1</div>', '<div>2</div>', '<div>3</div>', '<div>4</div>']
      var itemData = function itemData(item) {
        return props.columnDefs.map(function (col, index) {
          return '<li style=\'width: ' + (col.width || '200px') + '\' key=\'col' + index + '\'>' + (item[col.field] || '') + '</li>';
        });
      };

      var data = props.dataSource.map(function (item, index) {
        return '<div class=\'item\'>\n        <ul>\n          ' + itemData(item).join('') + '\n        </ul>\n      </div>';
      });
      // for (let i = 0; i < 10000; i++) {
      //   // data.push(`<div>test${i}</div>`)
      //   data.push(`<div class='item'>
      //     <ul>
      //       <li>name${i}</li>
      //       <li>attrs${i}</li>
      //       <li>description${i}</li>
      //     </ul>
      //   </div>`)
      // }
      (0, _clusterize2.default)({
        rows: data,
        scrollId: 'scrollArea',
        contentId: 'contentArea'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$columnDefs = this.props.columnDefs,
          columnDefs = _props$columnDefs === undefined ? [] : _props$columnDefs;

      return _react2.default.createElement(
        'div',
        { style: { height: '100%' }, className: 'transfer' },
        _react2.default.createElement(
          'div',
          { className: 'transfer-header' },
          _react2.default.createElement(
            'ul',
            null,
            columnDefs.map(function (col, index) {
              return _react2.default.createElement(
                'li',
                { key: col.headerName || index,
                  style: { width: col.width || '200px' }
                },
                col.headerName || ''
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'scrollArea', className: 'clusterize-scroll' },
          _react2.default.createElement(
            'div',
            { id: 'contentArea', className: 'clusterize-content' },
            _react2.default.createElement(
              'div',
              { className: 'clusterize-no-data' },
              'Loading data\u2026'
            )
          )
        )
      );
    }
  }]);

  return Transfer;
}(_react2.default.Component);

exports.default = Transfer;