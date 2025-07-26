import { Navigate, RelativeRoutingType, To, useLocation } from 'react-router-dom'

export interface NavigateProps {
  to: To
  replace?: boolean
  state?: any
  relative?: RelativeRoutingType
}

function Redirect({ to }: NavigateProps) {
  const location = useLocation()
  return <Navigate to={to} state={{ from: location }} />
}

export { Redirect }
