import React from 'react';
import ContactItem from './contact_item';

export default class Contacts extends React.Component {
    render() {
        const { friends } = this.props;
        const friendItems = friends.map(friend => <ContactItem key={friend.id} friend={friend} /> );
        return (
            <div className="contacts-container">
                <div className="contacts-header">
                    Contacts
                </div>
                {friendItems}
                {friendItems}
                {friendItems}
            </div>
        )
    }
}