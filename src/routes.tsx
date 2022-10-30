import withChunk from "./components/withChunk";

const Home = withChunk(() => import('./elements/Home'))
const PlanLayout = withChunk(() => import('./elements/PlanLayout'))
const NewPlan = withChunk(() => import('./elements/NewPlan'))
const Plan = withChunk(() => import('./elements/Plan'))

const routes: RouteProps[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: 'plans',
    element: <PlanLayout />,
    routes: [
      {
        path: 'new',
        element: <NewPlan />
      },
      {
        path: ':planId',
        element: <Plan />
      }
    ]
  }
]

export default routes