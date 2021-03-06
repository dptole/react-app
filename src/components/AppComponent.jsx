import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import '../assets/css/App.css'
import HomeComponent from './HomeComponent'
import { ROUTES } from '../assets/utils/const'

const ClicksComponent = React.lazy(() => import(/* webpackChunkName: 'ClicksComponent' */ './ClicksComponent'))
const IMDBComponent = React.lazy(() => import(/* webpackChunkName: 'IMDBComponent' */ './IMDBComponent'))
const MyAnimeListComponent = React.lazy(() => import(/* webpackChunkName: 'MyAnimeListComponent' */ './MyAnimeListComponent'))
const ProgrammingQuotesComponent = React.lazy(() => import(/* webpackChunkName: 'ProgrammingQuotesComponent' */ './ProgrammingQuotesComponent'))

const LoadingComponent = <h1 className="text-center">Loading...</h1>

const AppComponent = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar>.container-fluid>.collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" rel="noopener noreferrer" href="https://github.com/dptole" target="_blank">
              <svg aria-hidden="true" height="24" version="1.1" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
            <Link to={ROUTES.ROOT} className="navbar-brand">React App</Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a rel="noopener noreferrer" href="https://dptole.ngrok.io">Home</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Switch>
          <React.Suspense fallback={LoadingComponent}>
            <Route exact path={ROUTES.ROOT} component={HomeComponent} />
            <Route path={ROUTES.CLICKS} component={ClicksComponent} />
            <Route path={ROUTES.IMDB} component={IMDBComponent} />
            <Route path={ROUTES.MAL} component={MyAnimeListComponent} />
            <Route path={ROUTES.PROGQ} component={ProgrammingQuotesComponent} />

            <Redirect from="*" to={ROUTES.ROOT} />
          </React.Suspense>
        </Switch>
      </div>

      <div className="panel">
        <div className="panel-footer">
          <div className="text-center">
            <a className="label label-primary" rel="noopener noreferrer" href="https://github.com/dptole/react-app/" target="_blank">Source code</a>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AppComponent
