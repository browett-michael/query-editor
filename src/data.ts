import { RelationDefDTO } from "./dto";
import { AspectDefDTO, AspectViewDefDTO } from "./dto.ts";

const queryDef = [
  {
    ID: 101,
    viewDef: "de.aixpertsoft.CCKTCICompView",
    accessor: "",
    viewName: "CCKTCICompView1",
    maxRows: 100,
    filter: "${Category1} = 1234",
    relationFilter: ""
  },
  {
    ID: 102,
    PARENT_ID: 101,
    viewDef: "de.aixpertsoft.CCKTCIContractView",
    accessor: "Contracts",
    viewName: "CCKTCIContractView1",
    maxRows: 100,
    filter: "${Category1} = 456",
    relationFilter: ""
  },
  {
    ID: 103,
    PARENT_ID: 102,
    viewDef: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Responsable",
    viewName: "CCKTCIPersonView1",
    maxRows: 100,
    filter: "${Category1} = 789",
    relationFilter: ""
  }
];

const relations = [
  {
    ID: 1,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIContractView",
    accessor: "Contracts"
  },
  {
    ID: 2,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Administrators"
  },
  {
    ID: 3,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Users"
  },
  {
    ID: 4,
    sourceView: "de.aixpertsoft.CCKTCIContractView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Responsable"
  },
  {
    ID: 5,
    sourceView: "de.aixpertsoft.CCKTCIContractView",
    targetView: "de.aixpertsoft.CCKTMilestoneView",
    accessor: "Milestones"
  }
];

const targetViews = [
  {
    ID: 1,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIContractView",
    accessor: "Contracts"
  },
  {
    ID: 2,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Administrators"
  },
  {
    ID: 3,
    sourceView: "de.aixpertsoft.CCKTCICompView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Users"
  },
  {
    ID: 4,
    sourceView: "de.aixpertsoft.CCKTCIContractView",
    targetView: "de.aixpertsoft.CCKTCIPersonView",
    accessor: "Responsable"
  },
  {
    ID: 5,
    sourceView: "de.aixpertsoft.CCKTCIContractView",
    targetView: "de.aixpertsoft.CCKTMilestoneView",
    accessor: "Milestones"
  }
];

const allViews = [
  {
    ID: 1,
    targetView: "de.aixpertsoft.CCKTCICompView"
  },
  {
    ID: 2,
    targetView: "de.aixpertsoft.CCKTCISpecialContractView"
  },
  {
    ID: 3,
    targetView: "de.aixpertsoft.CCKTCIContractView"
  },
  {
    ID: 4,
    targetView: "de.aixpertsoft.CCKTMilestoneView"
  },
  {
    ID: 5,
    targetView: "de.aixpertsoft.CCKTCIPersonView"
  }
];

const aspects = [
  {
    name: "Components",
    description: "Components"
  },
  {
    name: "People",
    description: "People"
  },
  {
    name: "Contracts",
    description: "Contracts"
  }
];

export default {
  getQueryDef() {
    return queryDef;
  },
  getRelations() {
    return relations;
  },
  getTargetViews() {
    return targetViews;
  },
  getAllViews() {
    return allViews;
  },
  getAspects() {
    return aspects;
  },
  findAspectDef(name: string): AspectDefDTO {
    const def = new AspectDefDTO();
    def.views = [];
    def.relations = [];

    console.log(def);
    def.name = "Companies";
    def.label = "Companies";

    const viewDef = new AspectViewDefDTO();
    viewDef.name = "view1";
    viewDef.label = "view1";
    def.views.push(viewDef);

    const viewDef2 = new AspectViewDefDTO();
    viewDef2.name = "view2";
    viewDef2.label = "view2";
    def.views.push(viewDef2);

    const relationDef = new RelationDefDTO();
    relationDef.viewLinkDef = "relation1";
    relationDef.viewName = "view1";
    relationDef.destinationView = "view2";
    def.relations.push(relationDef);

    return def;
  }
};
