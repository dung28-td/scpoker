import Layout from "elements/Layout";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const generateRoutes = (routes: RouteProps[]) => routes.map((props, idx) => {
  if ('index' in props) return <Route key={idx} {...props} />

  const { routes = [], ...rest } = props

  return (
    <Route key={idx} {...rest}>
      {generateRoutes(routes)}
    </Route>
  )
})

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {generateRoutes(routes)}
      </Route>
    </Routes>
  );
}

export default App;
