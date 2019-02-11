import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.userId);
    }
    render() {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return (
            <div className="header">{user.name}</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // we can do some pre calculations on values that are coming into are component as props and our redux state
    return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);