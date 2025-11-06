export class Element {
  constructor(label, name, group, icon, render, editor, data, layout) {
    this.label = label;
    this.name = name;
    this.group = group;
    this.icon = icon;
    this.render = render;
    this.editor = editor;
    this.data = data;
    this.layout = layout;
  }
}