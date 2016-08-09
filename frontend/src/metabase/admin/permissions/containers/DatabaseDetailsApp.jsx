import React, { Component } from "react";
import { connect } from "react-redux";

import { getDatabases, getDatabaseDetails, getGroups } from "../selectors";
import { fetchDatabases, fetchDatabaseDetails, fetchGroups } from "../permissions";

import DatabaseDetails from "../components/DatabaseDetails.jsx";


function mapStateToProps(state, props) {
    return {
        databases: getDatabases(state, props),
        database: getDatabaseDetails(state, props),
        groups: getGroups(state, props)
    };
}

const mapDispatchToProps = {
    fetchDatabases,
    fetchDatabaseDetails,
    fetchGroups
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DatabaseDetailsApp extends Component {
    async componentWillMount() {
        await this.props.fetchDatabases();
        await this.props.fetchDatabaseDetails(this.props.routeParams.databaseID);
        await this.props.fetchGroups();
    }

    render() {
        return (
            <DatabaseDetails {...this.props} />
        );
    }
}