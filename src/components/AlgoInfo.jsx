import React from "react";
import "./AlgoInfo.scss";
import { GridContext } from "../grid-context";

class AlgoInfo extends React.Component {
  getAlgoProps = algo => {
    let weighted, shortestPath;
    if (algo === "DFS" || algo === "BFS") weighted = "unweighted";
    else weighted = "weighted";
    if (algo === "BFS" || algo === "Dijkstra" || algo === "A*")
      shortestPath = "does";
    else shortestPath = "does not";

    return (
      <div>
        <span className="font-weight-bold">{algo}</span> is{" "}
        <span className="font-italic">{weighted}</span> and {shortestPath}{" "}
        garuntee the <span className="font-italic">shortest path</span>
      </div>
    );
  };

  getStats = algoStats => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex block-container pr-3">
          <span className="block visited-block"></span>
          <p>
            <span className="font-weight-bold">{algoStats[0]}</span> nodes were{" "}
            <span className="font-weight-bold">visited</span>
          </p>
        </div>
        <div className="d-flex block-container">
          <span className="block path-block"></span>
          <p>
            <span className="font-weight-bold">{algoStats[1]}</span> nodes in
            the <span className="font-weight-bold">path</span>
          </p>
        </div>
      </div>
    );
  };

  render() {
    let searchResults, algoProps;
    if (this.props.algoStats.length)
      searchResults = this.getStats(this.props.algoStats);
    else searchResults = "";
    if (this.props.algo) algoProps = this.getAlgoProps(this.props.algo);
    else algoProps = "";

    return (
      <div>
        <div className="legend container">
          <div className="d-flex pr-3">
            <span className="block start-block"></span>Start Node
          </div>
          <div className="d-flex pr-3">
            <span className="block target-block"></span>Target Node
          </div>
          <div className="d-flex pr-3">
            <span className="block weight-block"></span>Weight Node
          </div>
          <div className="d-flex pr-3">
            <span className="block path-block"></span>Path Node
          </div>
          <div className="d-flex pr-3">
            <span className="block visited-block"></span>Visited Node
          </div>
          <div className="d-flex pr-3">
            <span className="block unvisited-block"></span>Unvisited Node
          </div>
          <div className="d-flex pr-3">
            <span className="block wall-block"></span>Wall Node
          </div>
        </div>
        <div className="algo-display container">
          <div className="row h-100">
            <div className="col-12 col-md-6 my-auto">{algoProps}</div>
            <div className="col-12 col-md-6 my-auto node-info">
              {searchResults}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AlgoInfo.contextType = GridContext;
export default AlgoInfo;
