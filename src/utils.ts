import { AspectViewDefDTO, AspectDefDTO, QueryNodeDTO } from "./dto";

export default {
  /** Convert AspectDefDTO to a QueryDef */
  toQueryDef(dto: AspectDefDTO): QueryNodeDTO[] {
    const findParentRel = (view: AspectViewDefDTO) => {
      const rel = dto.relations.find(
        (element) => element?.destinationView === view.name
      );
      console.log(rel);
      console.log("findParentRel completed");
      return rel;
    };
    const result = [];
    dto.views.forEach((view) => {
      const parentRel = findParentRel(view);
      result.push({
        ID: view.name,
        PARENT_ID: parentRel?.viewName,
        accessor: parentRel?.viewLinkDef,
        viewDef: view.viewDefName,
        viewName: view.name
      });
    });
    console.log(result);
    return result;
  }
};
