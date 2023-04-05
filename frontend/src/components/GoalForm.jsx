import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

function GoalForm() {
  const onSubmit = (e) => {
    e.preventDefalut();
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text"> Goal </label>
          <input type="text" />
        </div>
      </form>
      <div> GoalForm </div>
    </section>
  );
}

export default GoalForm;
