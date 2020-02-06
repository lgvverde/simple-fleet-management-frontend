import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Insert from './Insert';
import Edit from './Edit';
import List from './List';
import Delete from './Delete';
import Find from './Find';

export default function RouteList() {
    return (
        <Switch>
            <Route exact path="/">
                <Edit />
            </Route>
            <Route path="/insert">
                <Insert />
            </Route>
            <Route path="/edit">
                <Edit />
            </Route>
            <Route path="/list">
                <List />
            </Route>
            <Route path="/delete">
                <Delete />
            </Route>
            <Route path="/find">
                <Find />
            </Route>
        </Switch>
    );
}
