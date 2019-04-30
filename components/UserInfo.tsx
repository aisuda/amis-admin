import * as React from 'react';

interface UserInfoProps {
    user: any;
};
interface UserInfoState {
    open?: boolean;
};
export default class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
    constructor(props: UserInfoProps) {
        super(props);
        this.state = {
            open: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.logout = this.logout.bind(this);
    }

    static defaultProps = {
    };
    open() {
        this.setState({
            open: true
        });
    }
    close() {
        this.setState({
            open: false
        });
    }
    handleClickOutside() {
        this.close();
    }

    logout() {
        
    }

    render() {
        const user = this.props.user;
        const open = this.state.open;

        return (
            <div className="dropdown">
                <span
                    onClick={this.open}
                >
                    <span className="pull-right m-b-n-sm m-l-sm">
                        <span><i className="iconfont icon-admin" /></span>
                        <i className="on md b-white bottom" />
                    </span>
                    <span className="hidden-sm hidden-md">{user.name}</span>
                    <b className="caret" />
                </span>
            </div>
        );
    }
}