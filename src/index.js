import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import ViewQueryEditor from "./ViewQueryEditor";
import AspectQueryEditor from "./AspectQueryEditor";
import themes from "devextreme/ui/themes";
import service from "./data";

const onOkClicked = (query, selection, aspectName) => {
  console.log(query);
  console.log(selection);
  console.log(aspectName);
};

themes.initialized(() =>
  ReactDOM.render(
    <div>
      <ViewQueryEditor
        queryDef={service.getQueryDef()}
        onClickOk={onOkClicked}
      />
      <p />
      <AspectQueryEditor
        queryDef={service.getQueryDef()}
        selectedViews={[101, 102, 103]}
        onClickOk={onOkClicked}
        aspectName="People"
      />
    </div>,
    document.getElementById("app")
  )
);
