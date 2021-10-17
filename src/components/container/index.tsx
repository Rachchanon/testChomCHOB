import React from "react";

export const Container: React.FC = ({children}) => {
  return (
    <div
      style={{
        width: '100%',
        minWidth: '1186px',
        maxWidth: '1186px',
        margin: 'auto',
        padding: '0 10px'
      }}
    >
      {children}
    </div>
  );
};