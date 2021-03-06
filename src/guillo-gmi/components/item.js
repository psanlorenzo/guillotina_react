import React from "react";

import { ItemModel } from "../models";
import { TraversalContext } from "../contexts";
import { useContext } from "react";
import { Icon } from "./ui/icon";
import { ItemCheckbox } from "./selected_items_actions";
import { Delete } from "./ui";

export function Item({ item, setPath, icon }) {
  const Ctx = useContext(TraversalContext);
  const link = () => Ctx.setPath(item.path);
  return (
    <tr>
      <td onClick={link} style={{ width: "25px" }}>
        {icon && <Icon icon={icon} />}
      </td>
      <td onClick={link}>{item.id}</td>
    </tr>
  );
}

const smallcss = {
  width: "25px"
};

const mediumcss = {
  width: "120px"
};

export function RItem({ item, search }) {
  const traversal = useContext(TraversalContext);
  const model = new ItemModel(item, traversal.url, traversal.path);
  const link = () => traversal.setPath(model.path);

  return (
    <tr key={item}>
      <td style={smallcss}>
        <ItemCheckbox item={item} />
      </td>
      <td style={smallcss}>{<Icon icon={model.icon} />}</td>
      <td style={smallcss} onClick={link}>
        <span className="tag">{model.type}</span>
      </td>
      <td onClick={link}>
        {model.name}
        {search && (
          <React.Fragment>
            <br />
            <span className="is-size-7 tag is-light">{model.path}</span>
          </React.Fragment>
        )}
      </td>
      <td style={mediumcss} className="is-size-7 is-vcentered">
        {model.created}
      </td>
      <td style={mediumcss} className="is-size-7 is-vcentered">
        {model.updated}
      </td>
      <td style={smallcss}>
        {traversal.hasPerm("guillotina.DeleteContent") && (
          <Delete onClick={() => traversal.doAction("removeItems", {items:[model.item]})} />
        )}
      </td>
    </tr>
  );
}

export function ItemTitle({ title, actions }) {
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <h4 className="title has-text-primary is-size-5">{title}</h4>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">{actions && actions}</div>
      </div>
    </nav>
  );
}
