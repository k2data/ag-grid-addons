'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var oldPage = 1;

var PaginationInput = function (_React$Component) {
  _inherits(PaginationInput, _React$Component);

  function PaginationInput(props) {
    _classCallCheck(this, PaginationInput);

    var _this = _possibleConstructorReturn(this, (PaginationInput.__proto__ || Object.getPrototypeOf(PaginationInput)).call(this, props));

    _this.state = {
      value: 1
    };
    _this.changePage = _this.changePage.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.pageJump = _this.pageJump.bind(_this);
    return _this;
  }

  _createClass(PaginationInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.pages !== this.props.pages) {
        this.setState({ value: 1 });
      }
    }
  }, {
    key: 'changePage',
    value: function changePage(e) {
      var reg = /^[0-9]*$/;
      if (reg.test(e.target.value)) {
        this.setState({ value: e.target.value });
        if (e.target.value !== '') {
          oldPage = e.target.value;
        }
        this.props.onChange && e.target.value !== '' && this.props.onChange(e.target.value);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.setState({ value: Number(e.target.value) === 0 ? oldPage : e.target.value });
    }
  }, {
    key: 'pageJump',
    value: function pageJump(arg) {
      console.info(arg);
      var pages = this.props.pages;
      var value = this.state.value;

      var currentNum = void 0;
      switch (arg) {
        case 'first':
          currentNum = 1;
          break;
        case 'pre':
          currentNum = value - 1;
          break;
        case 'next':
          currentNum = value + 1;
          break;
        case 'last':
          currentNum = pages;
          break;
        default:
          return;
      }
      this.setState({ value: currentNum });
      oldPage = currentNum;
      this.props.onChange && this.props.onChange(currentNum);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          pages = _props.pages,
          _props$icons = _props.icons,
          icons = _props$icons === undefined ? {} : _props$icons;
      var value = this.state.value;

      var that = this;
      return _react2.default.createElement(
        'div',
        { className: 'pagination-input' },
        _react2.default.createElement(
          'button',
          { disabled: !pages || value === 1, onClick: function onClick() {
              that.pageJump('first');
            } },
          icons.first || _react2.default.createElement('i', { className: 'fa fa-angle-double-left', 'aria-hidden': 'true' })
        ),
        _react2.default.createElement(
          'button',
          { disabled: !pages || value === 1, onClick: function onClick() {
              that.pageJump('pre');
            } },
          icons.pre || _react2.default.createElement('i', { className: 'fa fa-angle-left', 'aria-hidden': 'true' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'pagination-change' },
          _react2.default.createElement('input', { value: value,
            onBlur: this.onBlur,
            onChange: this.changePage }),
          ' / ',
          pages || 0
        ),
        _react2.default.createElement(
          'button',
          { disabled: !pages || value === pages, onClick: function onClick() {
              that.pageJump('next');
            } },
          icons.next || _react2.default.createElement('i', { className: 'fa fa-angle-right', 'aria-hidden': 'true' })
        ),
        _react2.default.createElement(
          'button',
          { disabled: !pages || value === pages, onClick: function onClick() {
              that.pageJump('last');
            } },
          icons.last || _react2.default.createElement('i', { className: 'fa fa-angle-double-right', 'aria-hidden': 'true' })
        )
      );
    }
  }]);

  return PaginationInput;
}(_react2.default.Component);

exports.default = PaginationInput;