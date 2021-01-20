import React from 'react';

import Modal from './modal';
import Greeting from './header';

export default () => (
    <div>
        <header>
            <Modal />
            <h1>Holocron™</h1>
            <Greeting />
        </header>
        
    </div>
);