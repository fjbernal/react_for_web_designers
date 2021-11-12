"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  "use strict";

  var CONFIG = {
    apiUrl: "http://localhost/reactjs/status_api"
  };

  function PostForm(props) {
    var typeOptions = Object.keys(props.messageTypes).map(function (key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return /*#__PURE__*/React.createElement("option", {
          key: key,
          value: key
        }, props.messageTypes[key]);
      }
    }); // so we don't have to type this over and over

    var defaultType = typeOptions[0].key;

    var _React$useState = React.useState(""),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        messageText = _React$useState2[0],
        setMessageText = _React$useState2[1];

    var _React$useState3 = React.useState(defaultType),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        messageType = _React$useState4[0],
        setMessageType = _React$useState4[1];

    function onTextChange(event) {
      setMessageText(event.target.value);
    }

    function onTypeChange(event) {
      setMessageType(event.target.value);
    }

    function postStatusUpdate(evt) {
      evt.preventDefault();
      var newStatus = {
        msg: messageText,
        type: messageType,
        time: date.format(new Date(), "YYYY-MM-DD, HH:mm")
      };
      axios.post(CONFIG.apiUrl + "/post.php", newStatus).then(function (response) {
        if (response.data.success) {
          // Update state (list of messages)
          newStatus.id = response.data.id;
          props.addStatusMessage(newStatus); // reset the form values

          setMessageText("");
          setMessageType(defaultType);
        }
      });
    }

    return /*#__PURE__*/React.createElement("form", {
      onSubmit: postStatusUpdate
    }, /*#__PURE__*/React.createElement("h3", null, "Post an Update"), /*#__PURE__*/React.createElement("div", {
      className: "field-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "txt-message"
    }, "Message"), /*#__PURE__*/React.createElement("textarea", {
      id: "txt-message",
      rows: "2",
      onChange: onTextChange,
      value: messageText
    })), /*#__PURE__*/React.createElement("div", {
      className: "field-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "txt-type"
    }, "Type"), /*#__PURE__*/React.createElement("select", {
      id: "txt-type",
      onChange: onTypeChange,
      value: messageType
    }, typeOptions)), /*#__PURE__*/React.createElement("div", {
      className: "field-group action"
    }, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Post Update"
    })));
  }

  function StatusMessage(props) {
    var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
        dateFormat = "M/D/Y, h:mm A";
    return /*#__PURE__*/React.createElement("div", {
      className: "status-message"
    }, props.msg, /*#__PURE__*/React.createElement("span", {
      className: "name"
    }, "\u2014\xA0", props.type), /*#__PURE__*/React.createElement("span", {
      className: "time"
    }, date.format(statusDate, dateFormat)));
  }

  function StatusMessageList(props) {
    function displayStatusMessages() {
      return props.statuses.map(function (status) {
        return /*#__PURE__*/React.createElement("li", {
          key: status.id
        }, /*#__PURE__*/React.createElement(StatusMessage, {
          msg: status.msg,
          type: props.messageTypes[status.type],
          time: status.time
        }));
      });
    }

    if (props.loaded) {
      return /*#__PURE__*/React.createElement("ul", {
        id: "status-list"
      }, displayStatusMessages());
    } else {
      return /*#__PURE__*/React.createElement("div", {
        id: "status-list",
        className: "loading"
      }, "Loading...", /*#__PURE__*/React.createElement("div", {
        className: "spinner"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bounce1"
      }), /*#__PURE__*/React.createElement("div", {
        className: "bounce2"
      }), /*#__PURE__*/React.createElement("div", {
        className: "bounce3"
      })));
    }
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };

    var _React$useState5 = React.useState([]),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        statuses = _React$useState6[0],
        setStatuses = _React$useState6[1];

    var _React$useState7 = React.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        loaded = _React$useState8[0],
        setLoaded = _React$useState8[1];

    React.useEffect(function () {
      retrieveStatusMessages();
    }, []);

    function retrieveStatusMessages() {
      axios.get(CONFIG.apiUrl + "/get.php?delay=5").then(function (response) {
        setStatuses(response.data);
        setLoaded(true);
      });
    }

    function addStatusMessage(status) {
      var updatedStatuses = statuses.slice(0);
      updatedStatuses.push(status);
      setStatuses(updatedStatuses);
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      id: "post-status"
    }, /*#__PURE__*/React.createElement(PostForm, {
      messageTypes: messageTypes,
      addStatusMessage: addStatusMessage
    })), /*#__PURE__*/React.createElement(StatusMessageList, {
      messageTypes: messageTypes,
      statuses: statuses,
      loaded: loaded
    }));
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(StatusMessageManager, null), document.getElementById("react-statusmanager"));
})();
//# sourceMappingURL=hotel-dist.js.map