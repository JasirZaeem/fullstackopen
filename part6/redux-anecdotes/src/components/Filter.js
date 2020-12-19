import React from "react";
import { connect } from "react-redux";
import { setQuery } from "../reducers/queryReducer";

const Filter = ({ setQuery }) => {
  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {
  setQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
