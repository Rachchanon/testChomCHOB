import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

export const Test: React.FC = () => {

  const count = useSelector(
    (state: RootState) => state.rootReducer.counter.count
  );

  return (
    <div>
      fff <span>{count}</span> ddd
    </div>
  );
};
