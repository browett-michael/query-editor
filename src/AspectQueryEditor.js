import React from "react";
import {
  TreeList,
  Column,
  Editing,
  ValidationRule,
  Form,
  Selection
} from "devextreme-react/tree-list";
import { Item } from "devextreme-react/form";
import data from "./data.ts";
import utils from "./utils";
import "devextreme-react/text-area";
import "devextreme-react/number-box";
import Stack from "@mui/material/Stack";
import { Button } from "devextreme-react/button";
import DropDownBox from "devextreme-react/drop-down-box";
import CustomStore from "devextreme/data/custom_store";

import DataGrid, {
  Selection as GSelection,
  Paging as GPaging,
  FilterRow as GFilterRow
} from "devextreme-react/data-grid";

/** data grid */
const gridColumns = ["name", "description"];

class AspectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.gridDataSource = this.makeAsyncDataSource();
    this.state = {
      aspectName: [props.aspectName],
      isGridBoxOpened: false
    };
  }

  makeAsyncDataSource() {
    return new CustomStore({
      loadMode: "raw",
      key: "name",
      load() {
        console.log("Loading");
        return data.getAspects();
      }
    });
  }

  dataGridOnSelectionChanged = (e) => {
    console.log("dataGridOnSelectionChanged: " + e.selectedRowKeys);
    this.setState({
      aspectName: e.selectedRowKeys,
      isGridBoxOpened: false
    });
  };

  /** Renders a datagrid for selecting an aspect */
  dataGridRender = () => {
    return (
      <DataGrid
        dataSource={this.gridDataSource}
        columns={gridColumns}
        hoverStateEnabled={true}
        onSelectionChanged={this.dataGridOnSelectionChanged}
        height="100%"
      >
        <GSelection mode="single" />
        <GPaging enabled={true} pageSize={10} />
        <GFilterRow visible={true} />
      </DataGrid>
    );
  };

  dropDownValueChanged = (e) => {
    this.props.onAspectSelected(e.value);
  };

  onGridBoxOpened = (e) => {
    if (e.name === "opened") {
      console.log("onGridBoxOpened");
      this.setState({
        isGridBoxOpened: e.value
      });
    }
  };

  render() {
    console.log("Rendering AspectSelector");
    return (
      <div id="data-grid-demo">
        <DropDownBox
          label="Aspect name"
          dropDownOptions={{ width: "500" }}
          value={this.state.aspectName}
          acceptCustomValue={true}
          opened={this.state.isGridBoxOpened}
          deferRendering={true}
          placeholder="Select a value..."
          showClearButton={false}
          onValueChanged={this.dropDownValueChanged}
          onOptionChanged={this.onGridBoxOpened}
          contentRender={this.dataGridRender}
        />
      </div>
    );
  }
}

class AspectQueryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.treeList = null;
  }

  /** Called when the selection changes */
  onSelectionChanged = (e) => {
    this.props.onViewSelected(e.selectedRowKeys);
  };

  render() {
    console.log("Rendering AspectQueryGrid");
    return (
      <div id="data-grid-demo">
        <Stack spacing={1}>
          <TreeList
            ref={(ref) => {
              this.treeList = ref;
            }}
            dataSource={this.props.queryDef}
            keyExpr="ID"
            parentIdExpr="PARENT_ID"
            showBorders={true}
            onEditorPreparing={this.onEditorPreparing}
            autoExpandAll={true}
            onRowRemoved={this.onRowRemoved}
            selectedRowKeys={this.props.selectedViews}
            onSelectionChanged={this.onSelectionChanged}
          >
            <Selection mode="multiple" recursive={false} />
            <Editing mode="popup" useIcons={true} allowUpdating={true}>
              <Form>
                <Item itemType="group" colCount={1} colSpan={2}>
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
              dataField="viewName"
              allowSorting={false}
              allowEditing={false}
            >
              <ValidationRule type="required" />
            </Column>
            <Column dataField="filter" visible={true} />
            <Column dataField="relationFilter" visible={true} />
            <Column dataField="maxRows" visible={true} />
          </TreeList>
        </Stack>
      </div>
    );
  }
}

class AspectQueryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aspectName: props.aspectName,
      queryDef: props.queryDef,
      selectedViews: props.selectedViews
    };
  }

  /** Called when "OK" button is clicked */
  onClickOk = (e) => {
    if (this.props.onClickOk)
      this.props.onClickOk(
        this.state.queryDef,
        this.state.selectedViews,
        this.state.aspectName
      );
  };

  onViewSelected = (viewNames) => {
    console.log("onViewSelected " + viewNames);
    this.setState({
      selectedViews: viewNames
    });
  };

  onAspectSelected = (aspectName) => {
    const queryDef = utils.toQueryDef(data.findAspectDef(aspectName));
    this.setState({
      aspectName: aspectName,
      queryDef: queryDef,
      selectedViews: queryDef.map((element) => element.ID)
    });
  };

  render() {
    console.log("Rendering AspectQueryEditor");
    return (
      <div id="data-grid-demo">
        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="baseline"
          spacing={1}
        >
          <AspectSelector
            aspectName={this.state.aspectName}
            onAspectSelected={this.onAspectSelected}
          />
          <AspectQueryGrid
            queryDef={this.state.queryDef}
            selectedViews={this.state.selectedViews}
            onViewSelected={this.onViewSelected}
          />

          <Stack direction="row" spacing={1}>
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

export default AspectQueryEditor;
