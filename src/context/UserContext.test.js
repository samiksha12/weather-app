import {render} from '@testing-library/react';
import { UserContext } from './UserContext';
import App from '../App';

describe('App component',()=>{
    it('calls login function on mount',()=>{
        const loginMock = jest.fn();

        render(
            <UserContext.Provider value={{login:loginMock}}>
                <App/>
            </UserContext.Provider>
            
        );
        expect(loginMock).toHaveBeenCalled();
    })
})