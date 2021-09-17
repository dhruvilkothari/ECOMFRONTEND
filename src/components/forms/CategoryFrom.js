import React from "react";

function CategoryFrom({ handleSubmit, name, setName, loading }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit" className="btn  btn-outline-primary">
          {loading ? "Loading ....." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default CategoryFrom;
