describe("Given a Widget Utility", () => {
  it("is defined", () => {
    expect(Lib.Widget).to.not.be.undefined;
  });

  describe("can create a list", async () => {
    const data = [ "a", "b", "c", "d", "e", "f" ];
    it("can create an ordered list", async () => {
      const list = await Lib.Widget.List("list", data, true, "mylist");
      expect(list.outerHTML).to.equal(`<ol id="list" data-mylist="list"><li data-index="0">a</li><li data-index="1">b</li><li data-index="2">c</li><li data-index="3">d</li><li data-index="4">e</li><li data-index="5">f</li></ol>`);
    });

    it("can create an unordered list", async () => {
      const list = await Lib.Widget.List("list", data, false, "mylist");
      expect(list.outerHTML).to.equal(`<ul id="list" data-mylist="list"><li data-index="0">a</li><li data-index="1">b</li><li data-index="2">c</li><li data-index="3">d</li><li data-index="4">e</li><li data-index="5">f</li></ul>`);
    });

    it("can create a data list", async () => {
      const list = await Lib.Widget.DataList("list", data, false, "mylist");
      expect(list.outerHTML).to.equal(`<datalist id="list"><option value="a"></option><option value="b"></option><option value="c"></option><option value="d"></option><option value="e"></option><option value="f"></option></datalist>`);
    });
  });

  it("can create a description list", async () => {
    const data = {"A": "a", "B": "b", "C": "c", "D": "d", "E": "e", "F": "f" };
    const list = await Lib.Widget.DescriptionList("list", data, "mylist");
    expect(list.outerHTML).to.equal(`<dl id="list" data-mylist="list"><dt>A</dt><dd>a</dd><dt>B</dt><dd>b</dd><dt>C</dt><dd>c</dd><dt>D</dt><dd>d</dd><dt>E</dt><dd>e</dd><dt>F</dt><dd>f</dd></dl>`);
  });

  describe("can create an input", () => {
    beforeEach(() => {

    });

    afterEach(() => {

    });
    it("can create an text input and value", async () => {
      const field = {
        "type": "string"
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="text" value="bubba" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create an text input with min and max", async () => {
      const field = {
        "type": "string", // string, number, integer, boolean, object (can be an array), email, uri
        "minimum": 0,
        "maximum": 85
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="text" value="bubba" min="0" max="85" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create an email field", async () => {
      const field = {
         "type": "string", // string, number, integer, boolean, object (can be an array), email, uri
         "minimum": 0,
         "maximum": 85,
         "format": "email" // optional
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="email" value="bubba" min="0" max="85" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create an uri input", async () => {
      const field = {
         "type": "string", // string, number, integer, boolean, object (can be an array), email, uri
         "format": "uri"
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="url" value="bubba" name="fieldname" id="field" data-mybinding="fieldname">`);
    });
    it("can create an date-time input", async () => {
      const field = {
         "type": "string", // string, number, integer, boolean, object (can be an array), email, uri
         "format": "date-time"
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="datetime" value="bubba" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create an text field as required", async () => {
      const field = {
         "type": "string" // string, number, integer, boolean, object (can be an array), email, uri
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", true, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="text" value="bubba" required="true" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create an number field with min and max", async () => {
      const field = {
         "type": "number",
         "minimum": 0,
         "maximum": 85,
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="number" value="bubba" min="0" max="85" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create a checkbox", async () => {
      const field = {
         "type": "boolean"
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="checkbox" value="bubba" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create a select field", async () => {
      const field = {
         "type": "object"
      };
      const input = await Lib.Widget.Input(field, "fieldname", ["bubba", "drake"], "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<select name="fieldname" id="field" data-mybinding="fieldname"><option value="bubba">bubba</option><option value="drake">drake</option></select>`);
    });

    it("can create a textarea field", async () => {
      const field = {
         "type": "object"
      };
      const input = await Lib.Widget.Input(field, "fieldname", {"name": "drake"}, "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<textarea name="fieldname" id="field" data-mybinding="fieldname">{"name":"drake"}</textarea>`);
    });

    it("can create an text input with a pattern", async () => {
      const field = {
        "type": "string",
        "pattern": "[A-Za-Z0-9]"
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<input type="text" value="bubba" pattern="[A-Za-Z0-9]" name="fieldname" id="field" data-mybinding="fieldname">`);
    });

    it("can create a select field from enum values", async () => {
      const field = {
        "type": "string",
        "enum": [ "Katy", "Drake" ]
      };
      const input = await Lib.Widget.Input(field, "fieldname", "bubba", "field", false, "mybinding");
      expect(input.outerHTML).to.equal(`<select name="fieldname" id="field" data-mybinding="fieldname"><option value="Katy">Katy</option><option value="Drake">Drake</option></select>`);
    });
  });
});
