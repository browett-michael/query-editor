import React from "react";
import {
  TreeList,
  Column,
  Editing,
  Lookup,
  ValidationRule,
  Form,
  Selection
} from "devextreme-react/tree-list";
import { Item } from "devextreme-react/form";
import service from "./data.ts";
import "devextreme-react/text-area";
import "devextreme-react/number-box";
import Stack from "@mui/material/Stack";
import { Button } from "devextreme-react/button";

class ViewQueryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = props.queryDef;
    this.targetViews = service.getTargetViews();
    this.allViews = service.getAllViews();
    this.relations = service.getRelations();
    this.onClickOkCallback = props.onClickOk;
    this.getFilteredRelations = this.getFilteredRelations.bind(this);
    this.getTargetViews = this.getTargetViews.bind(this);
  }

  /** Remove matching items from array */
  remove = (arr, func) => {
    return Array.isArray(arr)
      ? arr.filter(func).reduce((acc, val) => {
          arr.splice(arr.indexOf(val), 1);
          return acc.concat(val);
        }, [])
      : [];
  };

  /** Called when an item is removed */
  /** TODO Doesn't work. Need to remove children + therir descencdants */
  onRowRemoved = (e) => {
    this.removeChildren(e.key);
  };

  removeChildren(id) {
    const children = this.dataSource.filter((item) => item.PARENT_ID === id);
    children.forEach((item) => {
      console.log("Removing " + item.ID);
      this.dataSource.splice(this.dataSource.indexOf(item), 1);
      this.removeChildren(item.ID);
    });
  }

  /** Called when "OK" button is clicked */
  onClickOk = (e) => {
    console.log("onClickOk");
    console.log(this.onClickOkCallback);
    if (this.onClickOkCallback) this.onClickOkCallback(this.dataSource);
  };

  getFilteredRelations(options) {
    console.log(
      "Called getFilteredRelations() with PARENT_ID=" + options?.data?.PARENT_ID
    );
    const parentNode = this.dataSource.find((element) => {
      return element.ID === options?.data?.PARENT_ID;
    });
    console.log(parentNode);
    if (!parentNode) return;
    return {
      store: this.relations,
      filter: parentNode ? ["sourceView", "=", parentNode.viewDef] : null
    };
  }

  getTargetViews(options) {
    const parentNode = this.dataSource.find(
      (element) => element.ID === options?.data?.PARENT_ID
    );
    console.log(
      "Called getTargetViews() with PARENT_ID=" + options?.data?.PARENT_ID
    );
    if (!parentNode) {
      return {
        store: this.allViews
      };
    } else {
      return {
        store: this.targetViews,
        filter: options.data
          ? [
              ["sourceView", "=", parentNode.viewDef],
              "and",
              ["accessor", "=", options.data.accessor]
            ]
          : null
      };
    }
  }

  onEditorPreparing(e) {
    if (
      e.parentType === "dataRow" &&
      e.dataField === "accessor" &&
      !e.row.data.PARENT_ID
    ) {
      e.editorOptions.disabled = true;
    }
  }

  setAssociation(rowData, value) {
    console.log("Called setAssociation()");
    rowData.viewDef = null;
    this.defaultSetCellValue(rowData, value);
  }

  render() {
    return (
      <div id="data-grid-demo">
        <Stack spacing={1}>
          <TreeList
            dataSource={this.dataSource}
            keyExpr="ID"
            parentIdExpr="PARENT_ID"
            showBorders={true}
            onEditorPreparing={this.onEditorPreparing}
            autoExpandAll={true}
            onRowRemoved={this.onRowRemoved}
          >
            <Editing
              mode="popup"
              useIcons={true}
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            >
              <Form>
                <Item itemType="group" colCount={1} colSpan={2}>
                  <Item dataField="accessor" />
                  <Item dataField="viewDef" />
                  <Item dataField="viewName" />
                  <Item dataField="maxRows" editorType="dxNumberBox" />
                  <Item
                    dataField="filter"
                    editorType="dxTextArea"
                    editorOptions={{ height: 100 }}
                  />
                  <Item
                    dataField="relationFilter"
                    editorType="dxTextArea"
                    editorOptions={{ height: 100 }}
                  />
                </Item>
              </Form>
            </Editing>

            <Column
              dataField="viewDef"
              calculateDisplayValue="viewDef"
              allowSorting={false}
            >
              <Lookup
                dataSource={this.getTargetViews}
                displayExpr="targetView"
                valueExpr="targetView"
              />
              <ValidationRule type="required" />
            </Column>
            <Column
              dataField="accessor"
              setCellValue={this.setAssociation}
              calculateDisplayValue="accessor"
              allowSorting={false}
            >
              <Lookup
                dataSource={this.getFilteredRelations}
                displayExpr="accessor"
                valueExpr="accessor"
              />
            </Column>
            <Column dataField="viewName" allowSorting={false}>
              <ValidationRule type="required" />
            </Column>
            <Column dataField="filter" visible={true} />
            <Column dataField="relationFilter" visible={true} />
            <Column dataField="maxRows" allowSorting={false} />
          </TreeList>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="baseline"
            spacing={1}
          >
            <Button
              width={120}
              text="Ok"
              type="success"
              stylingMode="contained"
              onClick={this.onClickOk}
            />
            <Button
              width={120}
              text="Cancel"
              type="normal"
              stylingMode="contained"
              onClick={this.onClickCancel}
            />
          </Stack>
        </Stack>
      </div>
    );
  }
}

export default ViewQueryEditor;
