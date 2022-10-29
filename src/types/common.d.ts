type RouteProps =
  | { index: true, element: React.ReactNode }
  | { path: string, element?: React.ReactNode, routes?: RouteProps[] }