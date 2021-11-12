"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  "use strict";

  function Person(props) {
    return /*#__PURE__*/React.createElement("div", {
      className: "person"
    }, /*#__PURE__*/React.createElement("h3", null, props.person.name, ", ", props.person.title), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("img", {
      className: "size-medium alignright",
      src: props.person.img,
      alt: props.person.name,
      width: "300",
      height: "300",
      sizes: "(max-width: 300px) 100vw, 300px"
    }), props.person.bio));
  }

  function People(props) {
    return /*#__PURE__*/React.createElement("div", {
      className: "results"
    }, /*#__PURE__*/React.createElement(ReactTransitionGroup.TransitionGroup, null, props.people.map(function (person) {
      return /*#__PURE__*/React.createElement(ReactTransitionGroup.CSSTransition, {
        key: person.id,
        classNames: {
          enter: "animated",
          enterActive: "zoomIn",
          exit: "animated",
          exitActive: "zoomOut"
        },
        timeout: 1000
      }, /*#__PURE__*/React.createElement(Person, {
        person: person
      }));
    })));
  }

  function Filters(props) {
    var _React$createElement;

    var titles = window.LMDirectory.titles;

    function updateName(event) {
      props.updateFormState({
        currentName: event.target.value
      });
    }

    function updateTitle(event) {
      props.updateFormState({
        currentTitle: event.target.value
      });
    }

    function updateIntern(event) {
      props.updateFormState({
        isIntern: event.target.checked
      });
    }

    function resetFilters() {
      props.updateFormState({
        "currentName": '',
        "currentTitle": '',
        isIntern: false
      });
    }

    return /*#__PURE__*/React.createElement("form", {
      action: "",
      id: "directory-filters"
    }, /*#__PURE__*/React.createElement("div", {
      className: "group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "person-name"
    }, "Name:"), /*#__PURE__*/React.createElement("input", (_React$createElement = {
      type: "text",
      name: "person_name",
      value: "",
      placeholder: "Name of employee",
      id: "person-name"
    }, _defineProperty(_React$createElement, "value", props.currentName), _defineProperty(_React$createElement, "onChange", updateName), _React$createElement))), /*#__PURE__*/React.createElement("div", {
      className: "group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "person-title"
    }, "Job Title:"), /*#__PURE__*/React.createElement("select", {
      name: "person_title",
      id: "person-title",
      value: props.currentTitle,
      onChange: updateTitle
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "- Select -"), titles.map(function (title) {
      return /*#__PURE__*/React.createElement("option", {
        value: title.key,
        key: title.key
      }, title.display);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "group"
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: "1",
      name: "person_intern",
      checked: props.isIntern,
      onChange: updateIntern
    }), " Intern")), /*#__PURE__*/React.createElement("div", {
      className: "group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "reset",
      value: "Reset",
      onClick: resetFilters
    })));
  }

  var Directory = /*#__PURE__*/function (_React$Component) {
    _inherits(Directory, _React$Component);

    var _super = _createSuper(Directory);

    function Directory(props) {
      var _this;

      _classCallCheck(this, Directory);

      _this = _super.call(this, props);
      _this.state = {
        people: window.LMDirectory.people,
        currentName: "",
        currentTitle: "",
        isIntern: false
      };
      _this.updateFormState = _this.updateFormState.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Directory, [{
      key: "updateFormState",
      value: function updateFormState(spec) {
        this.setState(spec, this.updatePeopleList);
      } // search the whole employee list with current filters

    }, {
      key: "updatePeopleList",
      value: function updatePeopleList() {
        var filteredPeople = window.LMDirectory.people.filter(function (person) {
          return person.intern === this.state.isIntern && (this.state.currentName === "" || person.name.toLowerCase().indexOf(this.state.currentName.toLowerCase()) !== -1) && (this.state.currentTitle === "" || person.title_cat === this.state.currentTitle);
        }.bind(this));
        this.setState({
          people: filteredPeople
        });
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement("div", {
          className: "company-directory"
        }, /*#__PURE__*/React.createElement("h2", null, "Company Directory"), /*#__PURE__*/React.createElement("p", null, "Learn more about each person at Leaf & Mortar in this company directory."), /*#__PURE__*/React.createElement(Filters, {
          currentName: this.state.currentName,
          currentTitle: this.state.currentTitle,
          isIntern: this.state.isIntern,
          updateFormState: this.updateFormState
        }), /*#__PURE__*/React.createElement(People, {
          people: this.state.people
        }));
      }
    }]);

    return Directory;
  }(React.Component);

  ReactDOM.render( /*#__PURE__*/React.createElement(Directory, null), document.getElementById('directory-root'));
})();
//# sourceMappingURL=directory-dist.js.map