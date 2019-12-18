import React from "react";
import { Table } from "./ui/table";
import { Icon } from "./ui/icon";

const defregistry = {
  "guillotina.behaviors.dublincore.IDublinCore": IDublinCore
};

export function BehaviorsView({ context, registry }) {
  registry = registry || defregistry;
  const behaviors = [].concat(
    context.__behaviors__,
    context["@static_behaviors"]
  );
  const GetBehavior = b => {
    const Cls = registry[b] ? registry[b] : BehaviorNotImplemented;
    return <Cls {...context[b]} />;
  };

  return (
    <React.Fragment>
      {behaviors.map(behavior => (
        <div className="container">
          <h3 className="title is-size-5">{behavior}</h3>
          <Table columns={["Name", "Value"]}
            className="is-striped is-fullwidth is-size-7">
              {GetBehavior(behavior)}</Table>
        </div>
      ))}
    </React.Fragment>
  );
}

export function BehaviorNotImplemented() {
  return (
    <tr>
      <td colSpan="2">Not Implemented</td>
    </tr>
  );
}

export function IDublinCore(props) {
  return (
    <React.Fragment>
      {Object.keys(props).map(key => (
        <tr>
          <td>{key}</td>
          <td>{props[key]}</td>
        </tr>
      ))}
    </React.Fragment>
  );
}

/*
<tr>
  <td>Creators</td>
  <td>{Ctx.context.creators.map(item =>
    <Author name={item}  key={'a' + item} />
    )}</td>
</tr> */

export function Author({ name }) {
  return (
    <div className="container">
      <Icon icon="fas fa-user" />
      <span>{name}</span>
    </div>
  );
}