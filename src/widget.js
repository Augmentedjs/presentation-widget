import Augmented from "augmentedjs-next";

/**
 * Widgets and small presentation modules
 */
class Widget {
  constructor() {
  };

  /**
   * List widget - renders a standard list
   * @method List
   * @param {string} id The id of the parent to attach the list
   * @param {Array} data The data to render
   * @param {boolean} ordered True if the list should be ordered
   * @param {string} binding The binding (used for decorator and optional)
   * @returns {Element} Returns a DOM element as a list

   */
  static List(id, data, ordered, binding) {
    let list = (ordered) ? document.createElement("ol") : document.createElement("ul"), i = 0, l, li, t, d;
    if (id) {
      list.setAttribute("id", id);
    }

    if (binding && id) {
      list.setAttribute("data-" + binding, id);
    }

    if (data && Array.isArray(data)) {
      l = data.length;
      for (i = 0; i < l; i++) {
        li = document.createElement("li");
        li.setAttribute("data-index", i);
        t = document.createTextNode(String(data[i]));
        li.appendChild(t);
        list.appendChild(li);
      }
    }
    return list;
  };
  /**
   * DescriptionList widget - renders a description list
   * @method DescriptionList
   * @param {string} id The id of the parent to attach the list
   * @param {Object} data The data to render
   * @param {string} binding The binding (used for decorator and optional)
   * @returns {Element} Returns a DOM element as a description list

   */
  static DescriptionList(id, data, binding) {
    let list = document.createElement("dl"), i = 0, l, dd, dt, t, keys, key;
    if (id) {
      list.setAttribute("id", id);
    }

    if (binding && id) {
      list.setAttribute("data-" + binding, id);
    }

    if (data && Augmented.isObject(data)) {
      keys = Object.keys(data);
      l = keys.length;
      for (i = 0; i < l; i++) {
        dt = document.createElement("dt");
        t = document.createTextNode(String(keys[i]));
        dt.appendChild(t);
        list.appendChild(dt);

        key = data[keys[i]];
        dd = document.createElement("dd");
        t = document.createTextNode(String(key));
        dd.appendChild(t);
        list.appendChild(dd);
      }
    }
    return list;
  };
  /**
   * DataList widget - renders a data list
   * @method DataList
   * @param {string} id The id of the parent to attach the list
   * @param {Array} data The data to render
   * @param {string} binding The binding (used for decorator and optional)
   * @returns {Element} Returns a DOM element as a data list

   */
  static DataList(id, data, binding) {
    let list = document.createElement("datalist"), i = 0, l, o;
    if (id) {
      list.setAttribute("id", id);
    }

    if (binding && id) {
      list.setAttribute("data-" + binding, id);
    }

    if (data && Array.isArray(data)) {
      l = data.length;
      for (i = 0; i < l; i++) {
        o = document.createElement("option");
        o.value = String(data[i]);
        list.appendChild(o);
      }
    }
    return list;
  };
  /**
   * Input widget - renders an input or simular based on type
   * @method Input
   * @param {object} field Field property object (required)
   * @param {string} name The name of the field
   * @param {string} value The value to preset
   * @param {string} id The id of the field
   * @param {boolean} required If the field is required
   * @param {string} binding The binding (used for decorator and optional)
   * @returns {Element} Returns a DOM element as an input

   */
  static Input(field, name, value, id, required, binding) {
    if (!field) {
      return null;
    }
    let input, dobj = ((value) ? value : ""), cobj = field, t = field.type;

    if (t === "object") {
      if (Array.isArray(dobj)) {
        let iii = 0, lll = dobj.length, option, tOption;
        input = document.createElement("select");
        for (iii = 0; iii < lll; iii++) {
          option = document.createElement("option");
          option.setAttribute("value", dobj[iii]);
          tOption = document.createTextNode(dobj[iii]);
          option.appendChild(tOption);
          input.appendChild(option);
        }
      } else {
        input = document.createElement("textarea");
        input.value = JSON.stringify(dobj);
      }
    } else if (t === "boolean") {
      input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (dobj === true) {
        input.setAttribute("checked", "checked");
      }
      input.value = dobj;
    } else if (t === "number" || t === "integer") {
      input = document.createElement("input");
      input.setAttribute("type", "number");
      input.value = dobj;
    } else if (t === "string" && cobj.enum) {
      input = document.createElement("select");
      let iiii = 0, llll = cobj.enum.length, option2, tOption2;
      for (iiii = 0; iiii < llll; iiii++) {
        option2 = document.createElement("option");
        option2.setAttribute("value", cobj.enum[iiii]);
        tOption2 = document.createTextNode(cobj.enum[iiii]);
        if (dobj === cobj.enum[iiii]) {
          option2.setAttribute("selected", "selected");
        }
        option2.appendChild(tOption2);
        input.appendChild(option2);
      }
    } else if (t === "string" && (cobj.format === "email")) {
      input = document.createElement("input");
      input.setAttribute("type", "email");
      input.value = dobj;
    } else if (t === "string" && (cobj.format === "uri")) {
      input = document.createElement("input");
      input.setAttribute("type", "url");
      input.value = dobj;
    } else if (t === "string" && (cobj.format === "date-time")) {
      input = document.createElement("input");
      input.setAttribute("type", "datetime");
      input.value = dobj;
    } else {
      input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = dobj;
    }

    if (t === "string" && cobj.pattern) {
      input.setAttribute("pattern", cobj.pattern);
    }

    if (cobj.minimum) {
      input.setAttribute("min", cobj.minimum);
    }

    if (cobj.maximum) {
      input.setAttribute("max", cobj.maximum);
    }

    if (t === "string" && cobj.minlength) {
      input.setAttribute("minlength", cobj.minlength);
    }

    if (t === "string" && cobj.maxlength) {
      input.setAttribute("maxlength", cobj.maxlength);
    }

    if (required) {
      input.setAttribute("required", "true");
    }

    if (name) {
      input.setAttribute("name", name);
    }

    if (id) {
      input.setAttribute("id", id);
    }

    if (binding && name) {
      input.setAttribute("data-" + binding, name);
    }

    return input;
  };
};

export default Widget;
