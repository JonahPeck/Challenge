import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicketList from './components/TicketList'; // Import the TicketList component

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/tickets" component={TicketList} /> {/* Add this line for TicketList */}
      </Switch>
    </Router>
  );
};

export default Routes;