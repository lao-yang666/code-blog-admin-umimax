import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const APIDocs = () => {
  return (
    <SwaggerUI url="/swagger-json" />
  );
};

export default APIDocs;